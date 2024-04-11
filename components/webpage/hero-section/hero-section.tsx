import React from 'react'
import { Typography } from 'antd'
import Link from 'next/link'

const { Title, Paragraph, Text } = Typography

export const HeroSection = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="mt-20 py-8 px-4 mx-auto max-w-screen-xl text-center lg:pt-16 lg:pb-8 lg:px-12">
        {/* <a
          href="/product"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          role="alert"
        >
          <span className="no-underline text-xs bg-tkyBlue rounded-full text-white px-4 py-1.5 mr-3">New</span>{' '}
          <span className="no-underline text-sm font-medium">Taskility is out! See what`&apos;`s new</span>
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </a> */}
        <h1 className="md:w-3/4 mb-4 mx-auto text-3xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          <span className="bg-gradient-to-r from-tkyBlue-dark to-tkyBlue-light via-tkyBlue text-transparent bg-clip-text leading-normal">
            Coordinar
          </span>{' '}
          personas en un embarque{' '}
          <span className="bg-gradient-to-r from-tkyBlue-light to-tkyBlue-dark via-tkyBlue text-transparent bg-clip-text leading-normal">
            nunca fue tan fácil
          </span>
        </h1>
        <p className="mb-8 text-sm font-light text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Generas un link por cada embarque donde todos colaboren y centralicen información. Automáticamente Taskility mantiene a todos
          informados y así evitas errores costosos.
        </p>
        <div className="flex flex-col mb-0 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          <Link
            href="/signup"
            className="no-underline inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-tkyBlue hover:bg-[#0073de] focus:ring-4 focus:ring-blue-300 dark:focus:ring-tkyBlue-navyDark"
          >
            Crea un embarque
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
          <Link
            href="https://outlook.office365.com/owa/calendar/TaskilityDemo@leanflow.ai/bookings/"
            className="no-underline inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center hover:text-tkyBlue rounded-lg border hover:bg-blue-100 focus:ring-4 focus:ring-blue-100 dark:text-white border-gray-400 hover:border-tkyBlue dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            <svg className="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
            </svg>
            Habla con ventas
          </Link>
        </div>
      </div>
    </div>
  )
}
