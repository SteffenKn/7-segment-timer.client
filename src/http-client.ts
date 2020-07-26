import fetch, {HeadersInit, RequestInit, Response} from 'node-fetch';

export class HttpClient {

  public baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<TResult>(url: string, options?: RequestInit): Promise<TResult> {

    const prefixedUrl: string = this.buildUrl(url);
    const headers: HeadersInit = this.buildHeaders(options);

    const request: RequestInit = {
      method: 'GET',
      headers: headers,
    };

    const response: Response = await fetch(prefixedUrl, request);
    const body: string = await response.text();
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const parsedResponse: TResult = this.tryParseStringtoJson<TResult>(body);
    return parsedResponse;
  }

  public async post<TPayload, TResult>(url: string, data?: TPayload, options?: RequestInit): Promise<TResult> {

    const prefixedUrl: string = this.buildUrl(url);
    const headers: HeadersInit = this.buildHeaders(options);

    const request: RequestInit = {
      method: 'POST',
      headers: headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    const response: Response = await fetch(prefixedUrl, request);
    const body: string = await response.text();

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const parsedResponse: TResult = this.tryParseStringtoJson<TResult>(body);
    return parsedResponse;
  }

  public async put<TResult>(url: string, data: TResult, options?: RequestInit): Promise<TResult> {

    const prefixedUrl: string = this.buildUrl(url);
    const headers: HeadersInit = this.buildHeaders(options);

    const request: RequestInit = {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data),
    };

    const response: Response = await fetch(prefixedUrl, request);
    const body: string = await response.text();

    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const parsedResponse: TResult = this.tryParseStringtoJson<TResult>(body);
    return parsedResponse;
  }

  public async delete<TResult>(url: string, options?: RequestInit): Promise<TResult> {

    const prefixedUrl: string = this.buildUrl(url);
    const headers: HeadersInit = this.buildHeaders(options);

    const request: RequestInit = {
      method: 'DELETE',
      headers: headers,
    };

    const response: Response = await fetch(prefixedUrl, request);
    const body: string = await response.text();
    if (response.status < 200 || response.status >= 300) {
      throw new Error(response.statusText);
    }

    const parsedResponse: TResult = this.tryParseStringtoJson<TResult>(body);
    return parsedResponse;
  }

  private buildUrl(url: string): string {
    if (this.baseUrl.endsWith('/') && url.startsWith('/')) {
      return `${this.baseUrl}${url.replace('/', '')}`;
    } else if (!this.baseUrl.endsWith('/') && !url.startsWith('/')) {
      return `${this.baseUrl}/${url}`;
    }

    return `${this.baseUrl}${url}`;
  }

  private buildHeaders(options?: RequestInit): HeadersInit {

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (options && options.headers !== undefined) {
      const optionHeaders: Array<string> = Object.keys(options.headers);

      for (const header of optionHeaders) {
        headers[header] = options.headers[header];
      }
    }

    return headers;
  }

  // tslint:disable-next-line:no-any
  private tryParseStringtoJson<TResult>(result: any): TResult {
    try {
      return JSON.parse(result);
    } catch (error) {
      return result;
    }
  }
}
