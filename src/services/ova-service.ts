import { OvaAdapter } from "@/adapters/ova-adapter";
import type { Ova, OvaAPIResponse } from "@/types/ova";


class OvaService {
    private ApiURL: string;
    static instance: OvaService | null = null;

    constructor(ApiURL: string) {
        this.ApiURL = ApiURL;
    }

    public static getInstance(ApiURL: string): OvaService {
        if (!OvaService.instance) {
            OvaService.instance = new OvaService(ApiURL);
        }
        return OvaService.instance;
    }

    async fetchOvas(): Promise<{ message: string; data: Ova[] } | { message: string; data: [] }> {
        try {
            const response = await fetch(this.ApiURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const rawData: OvaAPIResponse[] = await response.json();
            const dataAdapter = new OvaAdapter(rawData);

            return {
                message: 'Data fetched successfully',
                data: dataAdapter.adapt()
            };
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return {
                message: "Error fetching data from API",
                data: []
            }
        }
    }

    async fetchOvaGroups(): Promise<{ message: string; data: string[] } | { message: string; data: [] }> {
        try {
            const response = await fetch(`${this.ApiURL}/groups`);
            const data: string[] = await response.json();

            return {
                message: 'Data fetched successfully',
                data: data
            }
        }
        catch (error) {
            console.error("Error fetching groups from API:", error);
            return {
                message: "Error fetching groups from API",
                data: []
            }
        }
    }

    async fetchOvaZip(id: string): Promise<{ message: string; data: string } | { data: null; message: string }> {
        try {
            const response = await fetch(`${this.ApiURL}/zip/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            return {
                message: 'Zip generated successfully',
                data: url,
            };
        } catch (error) {
            console.error("Error fetching data from API:", error);
            return {
                message: "Error generated zip",
                data: null,
            }
        }
    }

}

const ovaService = OvaService.getInstance(import.meta.env.VITE_PUBLIC_API_URL);

export default ovaService;