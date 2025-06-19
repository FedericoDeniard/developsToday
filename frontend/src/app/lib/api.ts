import { Cat } from "./types";

export async function getCats(): Promise<Cat[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cats`, {
        next: { revalidate: 0 },
    });

    if (!res.ok) throw new Error("Error fetching cats");
    return res.json();
}
