import { Injectable } from '@angular/core';
import {createClient, PostgrestError, SupabaseClient} from "@supabase/supabase-js";
import {licitacion} from "./licitacion";

@Injectable({
  providedIn: 'root'
})
export class LicitacionService {
  supabase: SupabaseClient;
  supabaseURL = "https://mbokpvbyonvsvdfyutge.supabase.co";
  supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ib2twdmJ5b252c3ZkZnl1dGdlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzczNzU5MzUsImV4cCI6MTk5Mjk1MTkzNX0.2X7k8p3b_b9xa6jE0jqabrRzwqKlyy2hMF3h2h9GUHc";

  constructor() {
    this.supabase = createClient(this.supabaseURL, this.supabaseKEY);
  }

  async getTodos(): Promise<{ licitaciones: any[] | null, error: PostgrestError | null }> {
    let { data: licitaciones, error } = await this.supabase
      .from('licitaciones').select('*');
    if (error) return { licitaciones: null, error };

    return { licitaciones, error: null };
  }
}
