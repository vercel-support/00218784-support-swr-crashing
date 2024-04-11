import React from 'react'

export const TwoFeatureSection = () => {
  return (
    <section className="flex items-center justify-center bg-white px-[24px] pl-[48px] tablet:px-[142px]">
      <div className="pb-[64px] tablet:pb-[120px] relative flex w-[100%] items-stretch phablet:max-w-[720px] tablet:max-w-[1155px]">
        <div className="absolute bottom-0 right-[calc(100%+7px)] top-0 tablet:right-full">
          <div className="flex h-full flex-col items-center">
            <svg
              className="h-[34px] w-[34px] shrink-0 tablet:h-[49px] tablet:w-[49px]"
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17.5999" r="17" fill="white" />
              <g clipPath="url(#clip0_102_199656)">
                <path
                  d="M26.1938 9.94623L18.2162 6.13349C17.37 5.7248 16.3723 5.7801 15.5762 6.28039L7.34426 11.4642C6.54817 11.9645 6.06616 12.8415 6.07025 13.7812L6.10058 22.5968C6.10475 23.6388 6.70236 24.5884 7.64071 25.043L15.6183 28.8558C16.4645 29.2645 17.4622 29.2092 18.2583 28.7089L26.4902 23.525C27.2863 23.0247 27.7683 22.1478 27.7642 21.2081L27.7488 16.4685L27.7356 12.3925C27.7315 11.3504 27.1338 10.4009 26.1972 9.94793L26.1938 9.94623Z"
                  fill="#FAFAFA"
                  stroke="#383E47"
                  strokeMiterlimit="10"
                />
                <g opacity="0.8">
                  <path d="M14.9378 25.7565L9.24959 23.037C8.66805 22.7552 8.28935 22.154 8.28733 21.5061L8.26562 15.1409" fill="#FAFAFA" />
                  <path
                    d="M14.9378 25.7565L9.24959 23.037C8.66805 22.7552 8.28935 22.154 8.28733 21.5061L8.26562 15.1409"
                    stroke="#383E47"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                  <path d="M10.4512 14.7192L15.3438 17.0859C15.9223 17.3723 16.2979 17.972 16.2999 18.6184L16.3195 24.224" fill="#FAFAFA" />
                  <path
                    d="M10.4512 14.7192L15.3438 17.0859C15.9223 17.3723 16.2979 17.972 16.2999 18.6184L16.3195 24.224"
                    stroke="#383E47"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M8.27807 17.7716L8.26801 14.6092C8.2678 14.3255 8.46457 14.1703 8.54979 14.116C8.63501 14.0632 8.86126 13.9515 9.11714 14.0753L10.7377 14.8585"
                    fill="#FAFAFA"
                  />
                  <path
                    d="M8.27807 17.7716L8.26801 14.6092C8.2678 14.3255 8.46457 14.1703 8.54979 14.116C8.63501 14.0632 8.86126 13.9515 9.11714 14.0753L10.7377 14.8585"
                    stroke="#383E47"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M16.3106 22.0647L16.3224 25.5294C16.3226 25.8115 16.1383 25.9589 16.0593 26.0086C15.9802 26.0583 15.7679 26.1623 15.5136 26.0385L11.9313 24.3296"
                    fill="#FAFAFA"
                  />
                  <path
                    d="M16.3106 22.0647L16.3224 25.5294C16.3226 25.8115 16.1383 25.9589 16.0593 26.0086C15.9802 26.0583 15.7679 26.1623 15.5136 26.0385L11.9313 24.3296"
                    stroke="#383E47"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_102_199656">
                  <rect width="26.0667" height="26.0667" fill="white" transform="translate(3.9668 4.56665)" />
                </clipPath>
              </defs>
            </svg>
            <span className="line-gradient w-[1px] flex-1" />
          </div>
        </div>
        <div className="flex max-w-[100%] flex-1 flex-col">
          <div className="pl-[24px] tablet:pl-[40px]">
            <div className="text-tkyBlue-darkKnight text-3xl font-bold tablet:text-5xl  whitespace-pre-line phone:text-tkyBlue">
              Elimina tareas tediosas
            </div>
            <div className="text-tkyBlue-darkKnight text-lg text-normal tablet:text-2xl mt-[16px] max-w-[480px] text-typography-light-secondary phone:whitespace-pre-line">
              Aumenta tu productividad y enfocate en las tareas estratégicas
            </div>
          </div>
          <div className="relative mt-[60px] flex min-h-[380px] flex-col gap-[24px] tablet:mt-[80px]">
            <div className="grid grid-cols-1 gap-[24px] phone:grid-cols-2 phone:grid-rows-[min-content_1fr_min-content]">
              <div className="overflow-hidden rounded-[20px] flex w-full flex-col pl-[24px] pt-[20px] tablet:max-w-[1152px] tablet:flex-row tablet:gap-[64px] tablet:pl-[40px] tablet:pr-0 tablet:pt-[40px] col-span-1 phone:col-span-2 card-light-shadow bg-background-light-primary">
                <div className="w-full pr-[24px] phone:max-w-[368px] tablet:max-w-[218px] tablet:pr-0 desktop:max-w-[368px]">
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold phablet:text-base text-[#24292F]"
                  >
                    Esperas y recapturas
                  </span>{' '}
                  <span className="text-lg font-normal phablet:text-base max-w-[300px]  text-[#57606A]">
                    Olvídate de las tediosas recapturas de información y las interminables esperas para obtener los datos que necesitas. Al invitar a otros a colaborar en el embarque, la información que ellos capturan también se refleja en tiempo real para ti, eliminando la necesidad de repetir tareas y agilizando tus procesos logísticos.
                  </span>
                </div>
                <div className="mt-[48px] tablet:mt-0 rounded-tl-[20px] pl-[3px] pt-[3px] shadow-[inset_0.5px_0.5px_0px_0px_#E0E1E6,_inset_1.5px_1.5px_0px_0px_#fff,_inset_2px_2px_0px_0px_#DEDFE4,_inset_2.5px_2.5px_0px_0px_#E4E5E9,_inset_3px_3px_0px_0px_#F0F0F1] tablet:rounded-tl-[36px] tablet:pl-[4.8px] tablet:pt-[4.8px] tablet:shadow-[inset_0.8px_0.8px_0px_0px_#E0E1E6,_inset_2.4px_2.4px_0px_0px_#fff,_inset_3.2px_3.2px_0px_0px_#DEDFE4,_inset_4px_4px_0px_0px_#E4E5E9,_inset_4.8px_4.8px_0px_0px_#F0F0F1]">
                  <div className="h-[240px] overflow-hidden phablet:h-[320px] tablet:h-full">
                    <div className="relative">
                      <div className="absolute left-0 top-0 h-full">
                        <img
                          loading="lazy"
                          src="/Controlled-Collaboration-Minimal.png"
                          alt=""
                          className="h-full object-cover object-left"
                          style={{ objectPosition: '9.47288% center' }}
                        />
                      </div>
                      <img
                        src="/Controlled-Collaboration-Minimal.png"
                        loading="lazy"
                        alt=""
                        className="relative h-[276px] object-cover object-left phone:h-auto tablet:h-[459px]"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-[20px] row-span-2 card-light-shadow bg-background-light-primary">
                <div className="px-[24px] pb-[40px] pt-[20px] phablet:px-[32px] phablet:pt-[32px] desktop:p-[40px]">
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold phablet:text-base text-[#24292F]"
                  >
                    Acciones en un click
                  </span>{' '}
                  <span className="text-lg font-normal phablet:text-base max-w-[300px]  text-[#57606A]">
                    Las acciones que solían llevar horas ahora se realizan en segundos. Desde programar embarques hasta generar facturas, cada tarea se simplifica con un click.
                  </span>
                </div>
                <div className="relative px-[20px] py-[14px] phablet:py-[20px] desktop:px-[32px] desktop:py-[24px]">
                  <img
                    className="absolute left-0 top-0 h-full w-full object-cover object-center"
                    src="/dotted-background.webp"
                    alt=""
                  />
                  <img className="isolate object-contain" src="/One-click-actions-short.png" alt="" />
                </div>
              </div>
              {/* <div className="overflow-hidden rounded-[20px] card-light-shadow bg-background-light-primary">
                <div className="relative h-[272px] w-full phone:h-full">
                  <img
                    className="h-full w-full object-cover"
                    src="/home-steps-data-card-dotted-background-7JALCCOJ.png"
                    alt=""
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.56] tablet:scale-[0.7] desktop:scale-100">
                    <div className="mx-auto w-[302px]">
                      <div className="rounded-[12px] border border-greyscale-light-04 bg-white px-[16px] pb-[100px] pt-[12px]">
                        <div>
                          <p className="typography-c1-medium text-[#5C5E63]">Object</p>
                          <div className="mt-[6px] rounded-[12px] border border-greyscale-light-05 p-[11px] shadow-[0px_2px_6px_0px_rgba(24,_39,_75,_0.05),_0px_1px_2px_0px_rgba(24,_39,_75,_0.03)]">
                            <div className="flex justify-between">
                              <div className="flex items-center gap-x-[6px]">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none">
                                  <g clipPath="url(#a)">
                                    <path
                                      fill="#266DF0"
                                      fillRule="evenodd"
                                      d="M.5 6.9c0-2.24 0-3.36.436-4.216A4 4 0 0 1 2.684.936C3.54.5 4.66.5 6.9.5h4.2c2.24 0 3.36 0 4.216.436a4 4 0 0 1 1.748 1.748c.436.856.436 1.976.436 4.216v4.2c0 2.24 0 3.36-.436 4.216a4 4 0 0 1-1.748 1.748c-.856.436-1.976.436-4.216.436H6.9c-2.24 0-3.36 0-4.216-.436a4 4 0 0 1-1.748-1.748C.5 14.46.5 13.34.5 11.1V6.9Zm3.377-1.657c0-.754.612-1.366 1.366-1.366h1.66c.754 0 1.365.612 1.365 1.366v2.732c0 .755-.611 1.367-1.366 1.367H5.243a1.366 1.366 0 0 1-1.366-1.367V5.243Zm7.22 3.415c-.753 0-1.365.612-1.365 1.367v2.732c0 .754.612 1.366 1.366 1.366h1.659c.754 0 1.366-.612 1.366-1.366v-2.732c0-.755-.612-1.367-1.366-1.367h-1.66ZM9.733 5.243c0-.754.612-1.366 1.366-1.366h1.659c.754 0 1.366.612 1.366 1.366v.588c0 .754-.612 1.366-1.366 1.366h-1.66A1.366 1.366 0 0 1 9.733 5.83v-.588Zm-4.489 5.56c-.754 0-1.366.612-1.366 1.366v.588c0 .754.612 1.366 1.366 1.366h1.66c.754 0 1.365-.612 1.365-1.366v-.588c0-.754-.611-1.366-1.366-1.366H5.243Z"
                                      clipRule="evenodd"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="a">
                                      <path fill="#fff" d="M0 0h18v18H0z" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="typography-p6-strong">Workspace</span>
                              </div>
                              <div className="typography-c1-medium rounded-[8px] border border-[#EEEFF1] bg-[#F4F5F6] px-[5px] py-[1px] text-[#5C5E63]">
                                Custom
                              </div>
                            </div>
                            <hr className="my-[8p] border-greyscale-light-04" />
                            <div className="flex items-center gap-x-[4px]">
                              <span className="typography-c1-medium text-[#232529]">953</span>
                              <span className="font-inter text-[11px] font-medium leading-[16px] text-[#75777C]">Records</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-[30px]">
                          <div className="typography-c1-medium text-[#5C5E63]">
                            Attribute Type <span className="text-attio-blue-main">*</span>
                          </div>
                          <div className="mt-[6px] rounded-[12px] border border-greyscale-light-05 py-[7px] pl-[11px] pr-[7px]">
                            <div className="flex items-center justify-between">
                              <span className="typography-p6-medium text-[#75777C]">Select Attribute</span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M7 8.5L10 11.5L13 8.5"
                                  stroke="#5C5E63"
                                  strokeWidth="1.1"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mx-[17px] mt-[-95px] rounded-[12px] bg-white px-[4px] py-[8px] shadow-[0px_4px_12px_-2px_rgba(28,_40,_64,_0.16),_0px_4px_8px_-4px_rgba(28,_40,_64,_0.12),_0px_0px_0px_1px_rgba(28,_40,_64,_0.04)]">
                        <ul className="scrollbar-w-[4px] h-[180px] space-y-[1px] overflow-auto pr-[9px] scrollbar scrollbar-thumb-greyscale-light-06 [--scrollbar-thumb-radius:4px] [--scrollbar-width:6px]">
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-data-text-ZMFTU4QI.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Text</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px] bg-[#F4F5F6]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-hashtag-PMQCELTE.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Number</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-check-square-QPHDY4T3.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Checkbox</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-calendar-RVFCCRKZ.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Rating</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-clock-X2CA2FIO.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Timestamp</span>
                          </li>
                          <li className="flex items-center gap-x-8px rounded-6px px-8px py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-select-RGNVLRHE.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Select</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-multi-select-LA5PFN4L.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Multi-select</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-currency-D3L3DWWO.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Currency</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-reference-ZJPIXOAI.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Record reference</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-user-XTZNYDWH.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">User</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-status-RF2IGXMZ.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Status</span>
                          </li>
                          <li className="flex items-center gap-x-[8px] rounded-[6px] px-[8px] py-[6px]">
                            <img
                              className="h-[14px] w-[14px]"
                              src="/home-steps-data-card-attributes-relationship-connect-UAC5IYXA.svg"
                              alt=""
                            />
                            <span className="typography-p6-medium">Relationship</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="overflow-hidden rounded-[20px] card-light-shadow bg-background-light-primary">
                <div className="flex justify-between p-[12px] xphone:p-[16px] tablet:p-[24px]">
                  <img
                    className="w-[calc((100%-5*6px)/6)] w-20 xphone:w-[calc((100%-5*8px)/6)] tablet:w-[calc((100%-5*12px)/6)] rounded-[10px] border border-greyscale-light-05 p-[4px] xphone:p-[8px] tablet:rounded-[16px] tablet:p-[9px] desktop:p-[16px]"
                    src="/home-steps-data-card-logos-fivetran-QAXN5AIR.svg"
                    alt=""
                  />
                  <img
                    className="w-[calc((100%-5*6px)/6)] w-10 xphone:w-[calc((100%-5*8px)/6)] tablet:w-[calc((100%-5*12px)/6)] rounded-[10px] border border-greyscale-light-05 p-[4px] xphone:p-[8px] tablet:rounded-[16px] tablet:p-[9px] desktop:p-[16px]"
                    src="/home-steps-data-card-logos-hightouch-2TY4W7AO.svg"
                    alt=""
                  />
                  <img
                    className="w-[calc((100%-5*6px)/6)] w-10 xphone:w-[calc((100%-5*8px)/6)] tablet:w-[calc((100%-5*12px)/6)] rounded-[10px] border border-greyscale-light-05 p-[4px] xphone:p-[8px] tablet:rounded-[16px] tablet:p-[9px] desktop:p-[16px]"
                    src="/home-steps-data-card-logos-census-VUBIH2VL.svg"
                    alt=""
                  />
                  <img
                    className="w-[calc((100%-5*6px)/6)] w-10 xphone:w-[calc((100%-5*8px)/6)] tablet:w-[calc((100%-5*12px)/6)] rounded-[10px] border border-greyscale-light-05 p-[4px] xphone:p-[8px] tablet:rounded-[16px] tablet:p-[9px] desktop:p-[16px]"
                    src="/home-steps-data-card-logos-segment-G4WREFSX.svg"
                    alt=""
                  />
                  <img
                    className="w-[calc((100%-5*6px)/6)] w-10 xphone:w-[calc((100%-5*8px)/6)] tablet:w-[calc((100%-5*12px)/6)] rounded-[10px] border border-greyscale-light-05 p-[4px] xphone:p-[8px] tablet:rounded-[16px] tablet:p-[9px] desktop:p-[16px]"
                    src="/home-steps-data-card-logos-outlook-HX3JWWRV.svg"
                    alt=""
                  />
                  <img
                    className="w-[calc((100%-5*6px)/6)] w-10 xphone:w-[calc((100%-5*8px)/6)] tablet:w-[calc((100%-5*12px)/6)] rounded-[10px] border border-greyscale-light-05 p-[4px] xphone:p-[8px] tablet:rounded-[16px] tablet:p-[9px] desktop:p-[16px]"
                    src="/home-steps-data-card-logos-gmail-FSBOKVVY.svg"
                    alt=""
                  />
                </div>
              </div> */}
            </div>
            <div className="py-[40px] tablet:px-[0] tablet:pb-[160px] tablet:pt-[60px]">
              <div className="mx-auto flex max-w-[541px] flex-col tablet:items-center desktop:max-w-[606px]">
                <img className="h-[44px] w-[44px] rounded-full" src="/Stefani_Padua.jpeg" alt="Filip Mark" />
                <p className="text-lg font-light tablet:typography-p2-regular mt-[24px] text-typography-light-secondary tablet:text-center tablet:!leading-140">
                  “El dia a dia se simplifica con Taskility. Ahora es más fácil administrar embarques”
                </p>
                <div className="mt-[24px]">
                  <div className="typography-p6-medium tablet:text-center">
                    <p className="text-sm font-normal text-tkyGrey-dark">Enrique V.</p>
                    <p className="mt-[2px] text-sm font-normal text-tkyGrey">Ejecutivo de Cuenta, Herrera Logistics</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
