"use client";

import Image from "next/image";

import { Audio } from 'react-loader-spinner'

const Banner = () => {
  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-orange-500 text-5xl font-semibold">Luxxe Etiquette Shop</h1>
      <Audio
        height="80"
        width="80"
        color="green"
        ariaLabel="loading"
      />
      
      <Image 
        src="https://i.imgur.com/Feo7ZZ2.png"
        alt="luxxe_temp_picture"
        height={720}
        width={520}
      
      />
      
      <p>on the making. wait lang...</p>
    </main>
    </>
  )
}

export default Banner