type SelectOptions = {
  count?: 'exact';
  head?: boolean;
};

type QueryResponse<T> = {
  data: T[] | null;
  error: { message: string } | null;
  count: number | null;
};

// These are injected by vite.config.ts `define` at build/dev time from P1 secrets
declare const __DIRECTORY_URL__: string;
declare const __DIRECTORY_KEY__: string;

const supabaseUrl  = __DIRECTORY_URL__;
const supabaseAnonKey = __DIRECTORY_KEY__;

const isConfigured = !!(supabaseUrl && supabaseAnonKey);

const authHeaders = isConfigured ? {
  apikey: supabaseAnonKey as string,
  Authorization: `Bearer ${supabaseAnonKey}`,
} : {};

class QueryBuilder<T extends object> {
  private filters: Array<{ key: string; value: string }> = [];
  private orFilter: string | null = null;
  private selected = '*';
  private withCount = false;
  private headOnly = false;
  private fromIndex: number | null = null;
  private toIndex: number | null = null;
  private limitCount: number | null = null;
  private orderColumn: string | null = null;
  private orderAscending = true;

  constructor(private table: string) {}

  select(columns: string, options?: SelectOptions) {
    this.selected = columns;
    this.withCount = options?.count === 'exact';
    this.headOnly = !!options?.head;
    return this;
  }

  eq(column: string, value: string | number) {
    this.filters.push({ key: column, value: `eq.${String(value)}` });
    return this;
  }

  neq(column: string, value: string | number) {
    this.filters.push({ key: column, value: `neq.${String(value)}` });
    return this;
  }

  ilike(column: string, pattern: string) {
    this.filters.push({ key: column, value: `ilike.${pattern}` });
    return this;
  }

  or(filter: string) {
    this.orFilter = filter;
    return this;
  }

  not(column: string, operator: 'is', value: null) {
    const val = value === null ? 'null' : String(value);
    this.filters.push({ key: column, value: `not.${operator}.${val}` });
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.orderColumn = column;
    this.orderAscending = options?.ascending !== false;
    return this;
  }

  single() {
    this.limitCount = 1;
    return this.execute().then((res) => ({
      data: res.data?.[0] ?? null,
      error: res.error,
      count: res.count,
    }));
  }

  range(from: number, to: number) {
    this.fromIndex = from;
    this.toIndex = to;
    return this.execute();
  }

  async then<TResult1 = QueryResponse<T>, TResult2 = never>(
    onfulfilled?: ((value: QueryResponse<T>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return this.execute().then(onfulfilled, onrejected);
  }

  private async execute(): Promise<QueryResponse<T>> {
    if (!isConfigured) {
      return {
        data: null,
        error: { message: 'Supabase not configured. Running in mock data mode.' },
        count: null,
      };
    }

    const search = new URLSearchParams();
    search.set('select', this.selected);

    for (const filter of this.filters) {
      search.set(filter.key, filter.value);
    }

    if (this.orFilter) {
      search.set('or', `(${this.orFilter})`);
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(authHeaders as Record<string, string>),
    };

    if (this.withCount) {
      headers.Prefer = 'count=exact';
    }

    if (this.fromIndex !== null && this.toIndex !== null) {
      headers.Range = `${this.fromIndex}-${this.toIndex}`;
    } else if (this.limitCount !== null) {
      headers.Range = `0-${this.limitCount - 1}`;
    }

    if (this.orderColumn) {
      search.set('order', `${this.orderColumn}.${this.orderAscending ? 'asc' : 'desc'}`);
    }

    const method = this.headOnly ? 'HEAD' : 'GET';
    const response = await fetch(`${supabaseUrl}/rest/v1/${this.table}?${search.toString()}`, {
      method,
      headers,
    });

    if (!response.ok) {
      return {
        data: null,
        error: { message: `Supabase request failed (${response.status})` },
        count: null,
      };
    }

    const countHeader = response.headers.get('content-range');
    const count = countHeader ? Number(countHeader.split('/')[1]) : null;
    const data = this.headOnly ? [] : ((await response.json()) as T[]);

    return {
      data,
      error: null,
      count,
    };
  }
}

const createClient = (url: string | undefined, anonKey: string | undefined) => {
  void url;
  void anonKey;

  return {
    from<T extends object>(table: string) {
      return new QueryBuilder<T>(table);
    },
  };
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
