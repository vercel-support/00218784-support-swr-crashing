import React from 'react'

export const VideoSection = () => {
  return (
    <section>
      <div className="py-20 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        {/* <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]"> */}
        <div className="relative mx-auto border-gray-300 dark:border-gray-300 bg-gray-300 border-[8px] rounded-xl h-[192px] max-w-full md:h-[33rem] md:max-w-[57rem] aspect-w-16 aspect-h-9">
          <div className="rounded-lg overflow-hidden h-[156px] md:h-[32rem] bg-white dark:bg-gray-800">
            {/* <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-white dark:bg-gray-800"> */}

            <iframe
              allowFullScreen
              frameBorder="0"
              title="YouTube video player"
              src="https://www.youtube.com/embed/-yNTg_IONfM"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              className="relative w-full h-[32rem] md:h-[32rem] max-w-4xl mx-auto  rounded-md yt-video"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
