'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import Features from '@/public/images/features-04.png'

export default function Section01() {
  const [vehicleTypes, setVehicleTypes] = useState([])
  const [selectedMakeId, setSelectedMakeId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  useEffect(() => {
    async function fetchVehicleTypes() {
      try {
        const response = await fetch(
          ` https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json `
        )
        const data = await response.json()
        setVehicleTypes(data.Results)
      } catch (error) {
        console.error('Error fetching vehicle types:', error)
      }
    }
    fetchVehicleTypes()
  }, [])

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 2014 }, (_, i) => 2015 + i)

  return (
    <section className="mt-6" data-aos-id-4 aria-labelledby="section01-title">
      <div className="relative max-w-7xl mx-auto">
        {/* Background */}
        <div
          className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 border-2 border-slate-100 pointer-events-none -z-10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 rounded-tr-[100px] mb-24 md:mb-0 bg-gradient-to-t from-white pointer-events-none -z-10"
          aria-hidden="true"
        />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="py-12 md:py-20">
            {/* Section content */}
            <div className="relative max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row items-center">
              {/* Content */}
              <div className="w-[512px] max-w-full shrink-0">
                {/* Copy */}
                <h2
                  id="section01-title"
                  className="h2 mb-4"
                  data-aos="fade-up"
                  data-aos-anchor="[data-aos-id-4]"
                  data-aos-delay="100"
                >
                  Find Your Perfect Car
                </h2>
                <p
                  className="text-lg text-slate-500 mb-6"
                  data-aos="fade-up"
                  data-aos-anchor="[data-aos-id-4]"
                  data-aos-delay="200"
                >
                  Choose your preferred vehicle type and model year to see the
                  available options.
                </p>

                {/* Selectors */}
                <div
                  className="mb-8"
                  data-aos="fade-up"
                  data-aos-anchor="[data-aos-id-4]"
                  data-aos-delay="300"
                >
                  <div className="mb-4">
                    <label
                      htmlFor="vehicleType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vehicle Type
                    </label>
                    <select
                      id="vehicleType"
                      value={selectedMakeId}
                      onChange={(e) => setSelectedMakeId(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      aria-describedby="vehicleTypeDesc"
                    >
                      <option value="">Select a vehicle type</option>
                      {vehicleTypes.map((type) => (
                        <option key={type.MakeId} value={type.MakeId}>
                          {type.MakeName}
                        </option>
                      ))}
                    </select>
                    <span
                      id="vehicleTypeDesc"
                      className="sr-only text-sm text-gray-600"
                    >
                      Select a vehicle type from the dropdown list.
                    </span>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="modelYear"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Model Year
                    </label>
                    <select
                      id="modelYear"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                      aria-describedby="modelYearDesc"
                    >
                      <option value="">Select a model year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <span
                      id="modelYearDesc"
                      className="sr-only text-sm text-gray-600"
                    >
                      Select a model year from the dropdown list.
                    </span>
                  </div>
                </div>

                {/* Button */}
                <div
                  className="max-w-xs mx-auto sm:max-w-none"
                  data-aos="fade-up"
                  data-aos-anchor="[data-aos-id-4]"
                  data-aos-delay="300"
                >
                  <Link
                    href={`/result/${selectedMakeId}/${selectedYear}`}
                    passHref
                    aria-label={`Find cars for selected make and year`}
                  >
                    <button
                      disabled={!selectedMakeId || !selectedYear}
                      className={`btn-sm inline-flex items-center text-blue-50 bg-blue-500 hover:bg-blue-600 group shadow-sm ${
                        !selectedMakeId || !selectedYear
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                    >
                      Find Cars
                      <span className="tracking-normal text-sky-300 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-2">
                        <svg
                          className="fill-current"
                          width="12"
                          height="10"
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          aria-hidden="true"
                        >
                          <path d="M1 6.002h7.586L6.293 8.295a1 1 0 1 0 1.414 1.414l4-4a1 1 0 0 0 0-1.416l-4-4a 1 1 0 0 0-1.414 1.416l2.293 2.293H1a1 1 0 1 0 0 2Z" />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>

              {/* Image */}
              <div className="w-full max-w-sm md:max-w-none md:ml-8 mt-8 md:mt-0">
                <div className="relative -mx-8 md:mx-0">
                  <Image
                    src={Features}
                    className="md:max-w-none ml-auto"
                    width={496}
                    height={496}
                    alt="Illustration of car features"
                    data-aos="fade-up"
                    data-aos-anchor="[data-aos-id-4]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
