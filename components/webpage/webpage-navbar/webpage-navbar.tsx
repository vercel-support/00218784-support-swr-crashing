/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import { Card, Row, Col, Flex, Button, Space, Popover } from 'antd'
import { MenuOutlined, DownOutlined } from '@ant-design/icons'
import Router from 'next/router'
import Link from 'next/link'

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
)

export const WebpageNavbar = () => {
  return (
    <nav className="h-18 py-4 px-4 md:px-8 lg:px-16 bg-white/75 backdrop-blur ring-1 ring-black/5 sticky top-0 z-50">
      <Row>
        <Col xs={12} sm={12} md={6}>
          <div className="content-center justify-end">
            <Link href="/">
              <img src="/Taskility-logo-gris.svg" alt="Logo Taskility" height={30} className="h-8 content-center justify-end" />
            </Link>
            {/* <img src="/LeanflowAI_All_Black.svg" alt="Logo Taskility" height={30} /> */}
            {/* <img src="/LeanflowAI_Black_Letters.svg" alt="Logo Taskility" height={30} className='h-8' /> */}
          </div>
        </Col>
        <Col xs={0} sm={0} md={12} className="">
          {/* <Flex gap="small" wrap="wrap">
            <Button type="text" size="large" className="text-base">
              Products
            </Button>
            <Button type="text" size="large" className="text-base">
              Services
            </Button>
            <Button type="text" size="large" className="text-base">
              Resources
            </Button>
            <Button onClick={() => Router.push('/plans')} type="text" size="large" className="text-base">
              Planes{' '}
            </Button>
          </Flex>*/}
        </Col>
        <Col xs={0} sm={0} md={6} className="text-right">
          <Space className="justify-items-end">
            <Button type="text" size="large" className="text-base">
              <Link href="/plans">Planes</Link>
            </Button>
            <Button size="large" className="text-base">
              <Link href="/login">Log In</Link>
            </Button>
            <Link href="/signup">
              <Button type="primary" size="large" className="text-base">
                Crea un embarque
              </Button>
            </Link>
            {/* <Link
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
          </Link> */}
          </Space>
        </Col>
        <Col xs={12} sm={12} md={0} className="">
          <Flex justify="flex-end">
            <MenuOutlined className="inline-block align-middle pt-1 text-base" />
          </Flex>
        </Col>
      </Row>
    </nav>
  )
}

export const ExpertNavBar = () => {
  return (
    <header className="border-b border-transparent transition-[border-color] duration-500 ease-in-out sticky top-0 z-50 bg-white dark:bg-secondary">
      <div className="container">
        <nav className="pb-[7px] pt-[8px] tablet:pb-[15px] tablet:pt-[16px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-[44px]">
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <Link className="-mx-[6px] rounded-xl px-[6px]" href="/">
                <svg
                  className="fill-black dark:fill-white h-[36px] tablet:h-[40px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 40"
                  fill="none"
                >
                  <path d="M81.774 6.104h-4.111v4.112h4.11V6.104Z" />
                  <path
                    fillRule="evenodd"
                    d="M65.769 16.66h-3.61v6.681c0 .557.138.964.416 1.22.279.258.686.408 1.22.45.535.021 1.2.012 1.993-.031v3.758c-2.805.321-4.807.063-6.006-.77-1.178-.856-1.766-2.398-1.766-4.625v-6.68h-2.794v-3.985h2.794V9.434l4.143-1.252v4.498h6.404V9.436l4.143-1.252v4.498h3.629v3.984h-3.63v6.68c0 .558.139.965.417 1.22.279.259.686.408 1.22.451.535.02 1.2.012 1.99-.032v3.759c-2.804.32-4.805.063-6.005-.77-1.177-.856-1.766-2.398-1.766-4.625v-6.681h-2.794l.002-.008Z"
                    clipRule="evenodd"
                  />
                  <path d="M81.793 12.674H77.65v16.062h4.143V12.674Z" />
                  <path
                    fillRule="evenodd"
                    d="M91.553 12.257a8.448 8.448 0 0 0-8.446 8.449 8.448 8.448 0 1 0 16.893 0 8.446 8.446 0 0 0-8.447-8.449Zm-.014 12.915a4.482 4.482 0 0 1 0-8.962 4.48 4.48 0 0 1 4.479 4.48 4.48 4.48 0 0 1-4.48 4.482ZM49.791 12.642v.892a8.448 8.448 0 0 0-12.909 7.172 8.448 8.448 0 0 0 12.91 7.172v.891h4.11V12.642h-4.11Zm-4.477 12.53a4.482 4.482 0 0 1 0-8.962 4.462 4.462 0 0 1 4.477 4.406v.148a4.478 4.478 0 0 1-4.477 4.406v.002Z"
                    clipRule="evenodd"
                  />
                  <path d="m29.754 22.362-2.512-4.02s-.009-.017-.015-.024l-.198-.316a2.03 2.03 0 0 0-1.726-.96l-4.046-.014-.282.453-4.835 7.736-.267.428L17.9 28.88c.374.602 1.02.961 1.732.961h5.67c.699 0 1.36-.368 1.73-.959l.2-.32s.008-.008.01-.012l2.515-4.025a2.045 2.045 0 0 0 0-2.164h-.002Zm-.766 1.683-2.516 4.025c-.01.02-.024.034-.035.05a.34.34 0 0 1-.544-.05l-2.515-4.027a1.116 1.116 0 0 1-.13-.29 1.127 1.127 0 0 1 .127-.908l2.512-4.02.006-.01c.06-.09.135-.131.2-.144.026-.008.049-.01.067-.013h.028c.058 0 .202.018.292.164l2.511 4.02c.23.366.23.837 0 1.203h-.003ZM22.322 12.636a2.053 2.053 0 0 0 0-2.164l-2.512-4.02-.21-.338a2.031 2.031 0 0 0-1.732-.959h-5.67c-.707 0-1.354.36-1.731.96L.314 22.366a2.03 2.03 0 0 0-.002 2.162l2.723 4.359a2.026 2.026 0 0 0 1.73.959h5.67c.712 0 1.358-.36 1.732-.96l.208-.33v-.004l.003-.007 2.024-3.237 5.999-9.6 1.917-3.07.004-.001Zm-.593-1.082c0 .207-.058.416-.175.601l-9.946 15.918a.34.34 0 0 1-.291.16.342.342 0 0 1-.292-.16l-2.513-4.027a1.141 1.141 0 0 1 0-1.202l9.945-15.913a.339.339 0 0 1 .292-.163c.058 0 .202.017.293.164l2.512 4.02c.117.185.175.394.175.602Z" />
                </svg>
              </Link>
              <div className="relative">
                <nav aria-label="Main" data-orientation="horizontal" dir="ltr">
                  <div style={{ position: 'relative' }}>
                    <ul data-orientation="horizontal" className="hidden items-center gap-x-1 tablet:flex" dir="ltr">
                      <li className="[perspective:2000px]">
                        <button
                          className="inline-flex items-center justify-center gap-x-2 text-base button-ghost rounded-xl py-[7px] pl-[15px] pr-[11px] group select-none"
                          id="radix-:R4qa9:-trigger-Product"
                          data-state="closed"
                          aria-expanded="false"
                          aria-controls="radix-:R4qa9:-content-Product"
                          data-radix-collection-item=""
                          type="button"
                        >
                          <span className="relative">Product</span>
                          <div className="h-[18px] w-[18px]">
                            <svg
                              className="transition-transform duration-200 ease-out group-data-open:translate-y-[3px]"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.2"
                                d="M5.25 7.125 9 10.875l3.75-3.75"
                              />
                            </svg>
                          </div>
                        </button>
                      </li>
                      <li className="[perspective:2000px]">
                        <button
                          className="inline-flex items-center justify-center gap-x-2 text-base button-ghost rounded-xl py-[7px] pl-[15px] pr-[11px] group select-none"
                          id="radix-:R4qa9:-trigger-Resources"
                          data-state="closed"
                          aria-expanded="false"
                          aria-controls="radix-:R4qa9:-content-Resources"
                          data-radix-collection-item=""
                          type="button"
                        >
                          <span className="relative">Resources</span>
                          <div className="h-[18px] w-[18px]">
                            <svg
                              className="transition-transform duration-200 ease-out group-data-open:translate-y-[3px]"
                              xmlns="http://www.w3.org/2000/svg"
                              width="18"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.2"
                                d="M5.25 7.125 9 10.875l3.75-3.75"
                              />
                            </svg>
                          </div>
                        </button>
                      </li>
                      <li>
                        <Link
                          href="/customers"
                          className="inline-flex items-center justify-center gap-x-2 text-base button-ghost rounded-xl py-[7px] pl-[15px] pr-[15px]"
                          data-radix-collection-item=""
                        >
                          Customers
                        </Link>
                      </li>
                      <li>
                        <a
                          href="/pricing"
                          className="inline-flex items-center justify-center gap-x-2 text-base button-ghost rounded-xl py-[7px] pl-[15px] pr-[15px]"
                          data-radix-collection-item=""
                        >
                          Pricing
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <button className="p-3 tablet:hidden -mr-[12px]" type="button">
              <svg
                className="text-black-500 dark:text-white-500 h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M15 6H3M15 12H3" />
              </svg>
            </button>
            <div className="gap-x-3 hidden tablet:flex">
              <a
                href="https://app.attio.com/"
                className="inline-flex items-center justify-center gap-x-2 text-base button-outline rounded-xl py-[7px] pl-[15px] pr-[15px]"
              >
                Sign in
              </a>
              <a
                href="https://app.attio.com/welcome/sign-in"
                className="inline-flex items-center justify-center gap-x-2 text-base button-primary rounded-xl py-[7px] pl-[15px] pr-[15px]"
              >
                Start for free
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
