/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react'
import Link from 'next/link'

export const WebPageFooter = () => {
  return (
    <footer className="dark">
      <div className="bg-tkyBlue-darkKnight pb-6 pt-8 tablet:pb-16 tablet:pt-10 lg:pb-20">
        <div className="container grid grid-cols-12 gap-6 px-4 md:px-8 lg:px-16">
          <div className="col-span-full flex items-start justify-between gap-y-5 tablet:col-span-3 tablet:flex-col tablet:justify-start lg:col-span-2 lg:justify-between ">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <Link
              className="-m-1.5 inline-block rounded-xl p-1.5 transition-shadow duration-200 ease-out focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
              href="/"
            >
              <img src="/Taskility-logo-blanco.svg" alt="Logo Taskility" height={30} className="h-8" />
              
            </Link>
            <div className="flex tablet:-ml-2">
              <a
                className="group rounded-lg transition-shadow duration-200 ease-out focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                href="https://linkedin.com/company/attio"
                target="_blank" 
                rel="noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none">
                  <path
                    className="fill-[#8F99A8] transition-[fill] duration-200 ease-out group-hover:fill-[#006699] group-focus-visible:fill-[#006699] dark:fill-[#717A88]"
                    d="M9.287 10.39c0-.61.51-1.104 1.14-1.104h13.148c.63 0 1.14.495 1.14 1.105v13.218c0 .61-.51 1.105-1.14 1.105H10.427c-.63 0-1.14-.495-1.14-1.105V10.391Z"
                  />
                  <path
                    className="fill-white-100 transition-[fill] duration-200 ease-out group-hover:fill-white-100 group-focus-visible:fill-white-100 dark:fill-[#1C1D1F]"
                    fillRule="evenodd"
                    d="M13.964 22.2v-6.966h-2.33v6.967h2.33Zm-1.165-7.917c.812 0 1.318-.535 1.318-1.204-.015-.683-.506-1.203-1.303-1.203-.797 0-1.318.52-1.318 1.203 0 .669.506 1.204 1.288 1.204h.015ZM15.253 22.2h2.33v-3.89c0-.208.016-.416.077-.565.169-.416.552-.847 1.196-.847.843 0 1.18.64 1.18 1.576V22.2h2.33v-3.995c0-2.14-1.15-3.135-2.682-3.135-1.258 0-1.81.698-2.116 1.173h.015v-1.01h-2.33c.03.654 0 6.967 0 6.967Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                className="group rounded-lg transition-shadow duration-200 ease-out focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                href="https://twitter.com/attio"
                target="_blank" 
                rel="noreferrer"
              >
                <svg className="group" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none">
                  <path
                    className="fill-[#8F99A8] transition-[fill] duration-200 ease-out group-hover:fill-[#1D9BF0] group-focus-visible:fill-[#1D9BF0] dark:fill-[#717A88]"
                    d="M23.646 13.575c.01.148.01.296.01.445 0 4.547-3.45 9.79-9.757 9.79v-.002a9.683 9.683 0 0 1-5.256-1.543 6.87 6.87 0 0 0 5.075-1.426 3.435 3.435 0 0 1-3.204-2.39c.514.1 1.044.08 1.548-.059a3.438 3.438 0 0 1-2.75-3.372v-.044c.476.267 1.01.414 1.556.43a3.453 3.453 0 0 1-1.061-4.594 9.721 9.721 0 0 0 7.067 3.595 3.45 3.45 0 0 1 .992-3.288 3.425 3.425 0 0 1 4.852.15 6.865 6.865 0 0 0 2.177-.836 3.452 3.452 0 0 1-1.507 1.903 6.806 6.806 0 0 0 1.97-.541 6.98 6.98 0 0 1-1.712 1.782Z"
                  />
                </svg>
              </a>
              <a
                className="group rounded-lg transition-shadow duration-200 ease-out focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                href="https://dribbble.com/attio"
                target="_blank" 
                rel="noreferrer"
              >
                <svg className="group" xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="none">
                  <path
                    className="opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100 group-focus-visible:opacity-100"
                    fill="#EA4C89"
                    d="M17 24.68a7.68 7.68 0 1 0 0-15.36 7.68 7.68 0 0 0 0 15.36Z"
                  />
                  <path
                    className="fill-[#8F99A8] transition-[fill] duration-200 ease-out group-hover:fill-[#C32361] group-focus-visible:fill-[#C32361] dark:fill-[#717A88]"
                    fillRule="evenodd"
                    d="M17 9c-4.416 0-8 3.584-8 8s3.584 8 8 8c4.408 0 8-3.584 8-8s-3.592-8-8-8Zm5.284 3.688a6.802 6.802 0 0 1 1.545 4.251c-.226-.043-2.482-.503-4.755-.217-.052-.112-.096-.234-.148-.355-.139-.33-.295-.669-.45-.99 2.515-1.023 3.66-2.498 3.808-2.69ZM17 10.18c1.735 0 3.323.65 4.53 1.718-.122.174-1.155 1.553-3.584 2.464-1.12-2.056-2.36-3.74-2.551-4A6.948 6.948 0 0 1 17 10.18Zm-2.907.642a43.148 43.148 0 0 1 2.534 3.948c-3.193.85-6.013.833-6.317.833a6.865 6.865 0 0 1 3.783-4.78Zm-3.93 6.187V16.8c.295.01 3.61.052 7.02-.971.199.381.381.772.555 1.162l-.27.078c-3.522 1.137-5.396 4.243-5.553 4.504a6.817 6.817 0 0 1-1.752-4.564ZM17 23.837a6.786 6.786 0 0 1-4.19-1.44c.12-.252 1.509-2.924 5.361-4.269.018-.009.026-.009.044-.017a28.246 28.246 0 0 1 1.457 5.18 6.72 6.72 0 0 1-2.672.546Zm3.81-1.171c-.07-.416-.435-2.412-1.328-4.868 2.143-.338 4.017.217 4.251.295a6.775 6.775 0 0 1-2.924 4.573Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
          <div className="col-span-full mt-px tablet:col-span-9 lg:col-span-10">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 phablet:grid-cols-3 tablet:gap-y-6 lg:grid-cols-6">
              <div>
                <span className="py-1.5 text-sm text-tkyGrey-light">Product</span>
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="/changelog"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Changelog</span>
                      <span className="tracking-normal ml-1.5 inline-block rounded-[10px] bg-tkyBlue text-white px-1.5 py-1 text-[10px] font-normal leading-[7px] text-white-100">
                        New
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chrome.google.com/webstore/detail/attio/legacbojjmajoedfolbjlekjjkepadph/"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">Linkedin extension</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://chrome.google.com/webstore/detail/attio/legacbojjmajoedfolbjlekjjkepadph/"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">Gmail extension</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://apps.apple.com/gb/app/attio/id1511545395"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">iOS app</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.attio&amp;gl=GB"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">Android app</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/security"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Security</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="py-1.5 text-sm text-tkyGrey-light">Import from</span>
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="/help/reference/imports-and-exports/migrate-data-from-another-crm?source=footer_salesforce"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Salesforce</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/imports-and-exports/migrate-data-from-another-crm?source=footer_hubspot"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Hubspot</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/imports-and-exports/migrate-data-from-another-crm?source=footer_pipedrive"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Pipedrive</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/imports-and-exports/migrate-data-from-another-crm?source=footer_zoho"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Zoho</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/imports-and-exports/import-data-into-attio?source=footer_excel"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Excel</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/imports-and-exports/import-data-into-attio?source=footer_csv"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">CSV</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="py-1.5 text-sm text-tkyGrey-light">Company</span>
                <ul className="flex flex-col">
                  <li>
                    <Link
                      href="/customers"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Customers</span>
                      <span className="tracking-normal ml-1.5 inline-block rounded-[10px] bg-tkyBlue text-white px-1.5 py-1 text-[10px] font-normal leading-[7px] text-white-100">
                        New
                      </span>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/blog"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Blog</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/careers"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Careers</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/about"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">About</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="py-1.5 text-sm text-tkyGrey-light">Attio for</span>
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="/solution/startup-crm"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Startups</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/solution/deal-flow-management-software"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Deal flow</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="py-1.5 text-sm text-tkyGrey-light">Resources</span>
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="/startups"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Startup program</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Help center</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/templates/"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Automation templates</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/developers"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Developers</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://status.attio.com/"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">System status</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <span className="py-1.5 text-sm text-tkyGrey-light">Integrations</span>
                <ul className="flex flex-col">
                  <li>
                    <a
                      href="/help/reference/email-and-calendar/email-and-calendar-syncing"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Email &amp; Calendar</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/census-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Census</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/segment-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Segment</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/june-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">June</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/slack-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Slack</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/outreach-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Outreach</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/mixmax-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Mixmax</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/mailchimp-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Mailchimp</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/typeform-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Typeform</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="/help/reference/integrations/pylon-integration"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                    >
                      <span className="group-hover:underline">Pylon</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://zapier.com/apps/attio/integrations"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">Zapier</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.relay.app/apps/attio/integrations"
                      className="group -mx-1 inline-flex items-center rounded-lg p-1 text-sm font-normal text-tkyGrey underline-offset-[3px] transition-[color,box-shadow] duration-200 ease-out hover:text-tkyGrey-light focus-visible:text-tkyGrey-light focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <span className="group-hover:underline">Relay.app</span>
                      <svg
                        className="ml-[3px] stroke-transparent transition-[stroke] duration-200 ease-out"
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.1"
                          d="M3.641 10.359 10.36 3.64m0 0 .075 4.874m-.075-4.874-4.874-.075"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#132535] pb-4 pt-8 phone:py-4">
        <div className="container flex flex-col gap-y-5 text-xs font-normal text-tkyGrey-light dark:text-plr-disabled phablet:flex-row phablet:gap-x-6 px-4 md:px-8 lg:px-16">
          <div className="inline-block py-1">© 2024 Leanflow AI. All rights reserved.</div>
          <div className="flex gap-x-4 phablet:gap-x-6">
            <a
              className="-mx-1 inline-block rounded-lg p-1 transition-shadow duration-200 ease-out hover:text-tkyGrey focus-visible:text-tkyGrey focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
              href="/legal/terms-and-conditions"
            >
              Terms &amp; Conditions
            </a>
            <a
              className="-mx-1 inline-block rounded-lg p-1 transition-shadow duration-200 ease-out hover:text-tkyGrey focus-visible:text-tkyGrey focus-visible:outline-none focus-visible:ring focus-visible:active:ring-2"
              href="/legal/privacy"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
