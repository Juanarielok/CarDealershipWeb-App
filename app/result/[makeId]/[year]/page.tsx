// app/result/[makeId]/[year]/page.tsx
"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Spinner from "@/components/Spinner";
import ErrorBoundary from "@/components/ErrorBoundary";

// Function to extract makeId and year from the pathname
function useParams() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const makeId = segments[2];
  const year = segments[3];
  return { makeId, year };
}

async function fetchVehicleModels(makeId: string, year: string) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch models for makeId ${makeId} and year ${year}`
    );
  }
  const data = await response.json();
  return data.Results || [];
}

export default async function ResultPage() {
  const { makeId, year } = useParams();

  try {
    const vehicleModels = await fetchVehicleModels(makeId, year);

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">
          Vehicle Models for Make ID {makeId} in {year}
        </h1>
        <Suspense fallback={<Spinner />}>
          <ErrorBoundary>
            {vehicleModels.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicleModels.map((model) => (
                  <li
                    key={model.Model_ID}
                    className="bg-white shadow-md rounded-md p-4"
                  >
                    <h2 className="text-lg font-semibold">
                      {model.Model_Name}
                    </h2>
                    <p>Model ID: {model.Model_ID}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No models found for this make and year.</p>
            )}
          </ErrorBoundary>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error fetching vehicle models:", error);
    return <div>Failed to load vehicle models.</div>;
  }
}