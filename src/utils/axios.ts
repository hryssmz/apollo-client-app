// components/cypress-rwa/utils/axios.ts
import axios from "axios";

export const baseURL = import.meta.env.DEV ? "http://localhost:13003" : "";

export const api = axios.create({ baseURL });
