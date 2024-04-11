import React from 'react'

export const FourFeatureSection = () => {
  return (
    <section className="flex items-center justify-center bg-background-light-primary px-[24px] pl-[48px] tablet:px-[142px]">
      <div className="relative flex w-[100%] items-stretch phablet:max-w-[720px] tablet:max-w-[1155px]">
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
                  <path
                    d="M14.9378 25.7565L9.24959 23.037C8.66805 22.7552 8.28935 22.154 8.28733 21.5061L8.26562 15.1409"
                    fill="#FAFAFA"
                  />
                  <path
                    d="M14.9378 25.7565L9.24959 23.037C8.66805 22.7552 8.28935 22.154 8.28733 21.5061L8.26562 15.1409"
                    stroke="#383E47"
                    strokeWidth="0.8"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M10.4512 14.7192L15.3438 17.0859C15.9223 17.3723 16.2979 17.972 16.2999 18.6184L16.3195 24.224"
                    fill="#FAFAFA"
                  />
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
              Toda la información en un solo lugar
            </div>
            <div className="text-tkyBlue-darkKnight text-lg text-normal tablet:text-2xl mt-[16px] max-w-[480px] text-typography-light-secondary phone:whitespace-pre-line">
              No más interminables cadenas de correos que mantienen la información dispersa y a las personas desactualizadas
            </div>
          </div>
          <div className="relative mt-[60px] flex min-h-[380px] flex-col gap-[24px] tablet:mt-[80px]">
            <div className="flex flex-col gap-[24px] tablet:flex-row">
              <div className="overflow-hidden rounded-[20px] relative flex min-h-[560px] w-full flex-1 flex-col pl-[24px] pt-[24px] tablet:max-w-[684px] tablet:pl-[40px] tablet:pt-[40px] card-light-shadow bg-background-light-primary">
                <span className="inline-block max-w-[524px] pb-[48px] pr-[24px] tablet:pb-[60px]">
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold phablet:text-base text-[#24292F]"
                  >
                    Fromularios
                  </span>{' '}
                  <span className="text-lg font-normal phablet:text-base max-w-[300px]  text-[#57606A]">
                    Registra toda la información que necesitas de manera rápida y sin complicaciones. Por ejemplo: Datos generales, Carga, Destinos, Costos, Precios, etc.
                  </span>
                </span>
                <div className="absolute bottom-0 ml-auto mt-auto max-w-[644px]">
                  <div className="relative">
                    <img loading="lazy" alt="" src="/Sections.png" className="min-w-[44px]" />
                    {/* <div
                      className="absolute left-[185px] top-[109px]"
                      style={{transform: 'translateX(160px) translateY(72px) translateZ(0px)'}}
                    >
                      <div className="relative">
                        <div
                          className="absolute right-0 top-[-16px] flex h-[16px] w-[38px] flex-row items-center justify-center bg-[#0FC27B] px-[4px] py-0"
                          style={{borderRadius:"6px 6px 0px 0px"}}
                        >
                          <span className="font-inter text-[11px] leading-[16px] text-white">Alex</span>
                        </div>
                        <div style={{width: '148px; height: 37px', border: '1px solid rgb(15, 194, 123)', borderRadius: "4px 0px 4px 4px"}} />
                      </div>
                    </div> */}
                    {/* <div
                      className="absolute left-[25px] top-[253px]"
                      style={{transform: 'translateX(467px) translateY(72px) translateZ(0px)'}}
                    >
                      <div className="relative">
                        <div
                          className="absolute right-0 top-[-16px] flex h-[16px] w-[38px] flex-row items-center justify-center bg-[#7A50ED] px-[4px] py-0"
                          style={{borderRadius:"6px 6px 0px 0px"}}
                        >
                          <span className="font-inter text-[11px] leading-[16px] text-white">Anna</span>
                        </div>
                        <div style={{ width: "147px", height: "37px", border: "1px solid rgb(122, 80, 237)", borderRadius: "4px 0px 4px 4px" }} /> 
                      </div>
                    </div> */}
                    <div
                      className="absolute left-[493px] top-[289px] opacity-0"
                      style={{opacity: "1", transform: "translateX(-308px) translateY(-180px) translateZ(0px)"}}
                    >
                      <div className="relative">
                        <div
                          className="absolute right-0 top-[-16px] flex h-[16px] w-[38px] flex-row items-center justify-center bg-[#06A0C6] px-[4px] py-0"
                          style={{borderRadius:"6px 6px 0px 0px"}}
                        >
                          <span className="font-inter text-[11px] leading-[16px] text-white">Ethan</span>
                        </div>
                        <div style={{width: '161px', height: '37px', border: '1px solid rgb(6, 160, 198)', borderRadius: "4px 0px 4px 4px;"}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="overflow-hidden rounded-[20px] w-full px-[24px] pt-[24px] tablet:max-w-[448px] tablet:px-[40px] tablet:pt-[40px] card-light-shadow bg-background-light-primary">
                <span className="inline-block max-w-[420px] pb-[48px] tablet:pb-[60px]">
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold phablet:text-base text-[#24292F]"
                  >
                    GPS
                  </span>{' '}
                  <span className="text-lg font-normal phablet:text-base max-w-[300px]  text-[#57606A]">
                    Mantén un control total sobre la ubicación de tus productos desde que salen hasta que llegan a su destino.
                  </span>
                </span>
                <div className="relative ml-auto mr-auto max-w-[258px] overflow-hidden">
                  <div className="absolute">
                    <div className="relative" style={{transform: "translateX(-218px) translateZ(0px)"}}>
                      <div className="absolute">
                        <div className="relative">
                          <div
                            className="absolute z-[1] flex w-[140px] flex-col rounded-[8px] border border-neutral-dark-900 bg-white"
                            style={{top: '136px', left: '24px', zIndex: '4', borderColor: 'rgb(238, 239, 241)', backgroundColor: 'rgb(255, 255, 255)', transform: 'translateX(152px) scale(1) translateZ(0px)'}}
                          >
                            <div className="flex flex-row items-center gap-[4px] px-[8px] py-[6px]">
                              <div
                                className="flex h-[10px] w-[10px] items-center justify-center rounded-full"
                                style={{backgroundColor: "rgb(6, 160, 198)"}}
                              >
                                <span className="font-inter text-[6px] font-medium text-white">C</span>
                              </div>
                              <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337] underline decoration-neutral-dark-900 underline-offset-4">
                                Charles Sanchez
                              </span>
                            </div>
                            <div className="my-[2px] h-[1px] w-[100%] bg-neutral-dark-900" />
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141538)">
                                    <path
                                      d="M3.05451 8.94191H7.26799C7.69505 8.94191 8.04125 8.59571 8.04125 8.16865C8.04125 7.11116 7.18399 6.25391 6.12651 6.25391H5.16125H4.19599C3.13851 6.25391 2.28125 7.11116 2.28125 8.16865C2.28125 8.59571 2.62745 8.94191 3.05451 8.94191Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <circle
                                      cx="5.22906"
                                      cy="3.34234"
                                      r="1.44"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141538">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.941406)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(255, 237, 203)", color: "rgb(126, 83, 8)"}}
                                >
                                  Manager
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141552)">
                                    <path
                                      d="M1.72462 8.17962H6.19194C6.59214 8.17962 6.91656 7.8552 6.91656 7.455C6.91656 6.42275 6.07975 5.58594 5.0475 5.58594H3.95828L2.86906 5.58594C1.83681 5.58594 1 6.42275 1 7.455C1 7.8552 1.32442 8.17962 1.72462 8.17962Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <ellipse
                                      cx="4.02602"
                                      cy="2.61512"
                                      rx="1.47914"
                                      ry="1.4784"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.54688 5.60156C8.54511 5.74023 9.32164 6.59506 9.32164 7.63187C9.32164 8.08289 8.85954 8.04584 8.52852 8.04584H8.12062"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.21875 4.10093C7.03566 4.10093 7.69789 3.43737 7.69789 2.61882C7.69789 1.80028 7.03566 1.13672 6.21875 1.13672"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141552">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.179688)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(208, 253, 218)", color: "rgb(20, 101, 64)"}}
                                >
                                  Marketing
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141566)">
                                    <path
                                      d="M5.16031 7.82187L3.88031 7.82187C2.98423 7.82187 2.53619 7.82187 2.19393 7.64748C1.89287 7.49409 1.6481 7.24932 1.4947 6.94826C1.32031 6.606 1.32031 6.15796 1.32031 5.26187L1.32031 3.98187C1.32031 3.08579 1.32031 2.63775 1.4947 2.29549C1.6481 1.99443 1.89287 1.74966 2.19393 1.59626C2.53619 1.42187 2.98423 1.42187 3.88031 1.42187L6.76031 1.42187C7.35592 1.42187 7.65373 1.42187 7.89474 1.50018C8.38184 1.65845 8.76373 2.04035 8.922 2.52745C8.98484 2.72084 8.99726 4.23081 8.99971 4.62187"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M5.99219 6.63562L8.68019 6.63562M8.68019 6.63562L7.60499 5.51562M8.68019 6.63562L7.60499 7.75562"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.92188 3.5L7.40187 3.5"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.36719 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.95312 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141566">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.140625)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">In 9 days</span>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141584)">
                                    <path
                                      d="M8.36094 4.75237C8.36094 7.11874 6.39491 9.14094 5.16094 9.14094C3.92696 9.14094 1.96094 7.11874 1.96094 4.75237C1.96094 2.93456 3.39363 1.46094 5.16094 1.46094C6.92825 1.46094 8.36094 2.93456 8.36094 4.75237Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                    />
                                    <circle cx="5.15906" cy="4.65906" r="1.12" stroke="#5E5E5E" strokeWidth="0.704" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141584">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.820312)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">London</span>
                              </div>
                            </div>
                            <div className="mt-[4px] flex flex-row gap-[8px] px-[8px] py-[4px]">
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M5.48063 0.542969L3.68862 0.542969C2.97175 0.542969 2.61332 0.542969 2.33951 0.682481C2.09867 0.805199 1.90285 1.00102 1.78013 1.24186C1.64062 1.51567 1.64062 1.87444 1.64063 2.59197C1.64063 3.56708 1.64064 4.23887 1.64064 5.21397C1.64065 5.93152 1.64065 6.29029 1.78016 6.56409C1.90288 6.80494 2.09869 7.00075 2.33954 7.12347C2.61335 7.26298 2.97178 7.26298 3.68865 7.26298H5.35262C6.06949 7.26298 6.42792 7.26298 6.70173 7.12347C6.94258 7.00075 7.13839 6.80494 7.26111 6.56409C7.40062 6.29028 7.40062 5.93185 7.40062 5.21498L7.40062 2.46297M5.48063 0.542969V1.69497C5.48063 1.9638 5.48063 2.09821 5.53295 2.20089C5.57897 2.29121 5.6524 2.36464 5.74272 2.41066C5.8454 2.46297 5.97981 2.46297 6.24863 2.46297H7.40062M5.48063 0.542969L6.44063 1.50297L7.40062 2.46297"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="w-[4px]" />
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M2.75781 4.10895L2.82648 4.23297C3.05688 4.64914 3.17208 4.85722 3.3249 4.92739C3.45815 4.98858 3.61123 4.98971 3.74536 4.93049C3.89919 4.86257 4.01744 4.6562 4.25395 4.24347L4.99781 2.94531"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <rect
                                    x="0.835938"
                                    y="0.863281"
                                    width="6.08"
                                    height="6.08"
                                    rx="1.28"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">1</span>
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M7.59106 3.00815C7.89745 3.24213 8.10667 3.59634 8.14952 4.00156C8.1575 4.07705 8.1575 4.16674 8.1575 4.3461V6.28977C8.1575 6.49495 8.1575 6.59754 8.13953 6.66135C8.0619 6.93703 7.76168 7.08381 7.49644 6.97578C7.43504 6.95077 7.35408 6.88777 7.19215 6.76176C7.09736 6.688 7.04997 6.65112 7.00096 6.61902C6.79971 6.48718 6.56863 6.40786 6.32883 6.38832C6.27044 6.38356 6.21039 6.38356 6.09028 6.38356H4.38809C4.32255 6.38356 4.28978 6.38356 4.26207 6.38249C3.82472 6.36564 3.43779 6.15459 3.18494 5.83297M1.4375 4.80804V3.09697C1.4375 2.29049 1.4375 1.88726 1.59445 1.57922C1.73251 1.30827 1.9528 1.08798 2.22375 0.949919C2.53179 0.792969 2.93502 0.792969 3.7415 0.792969H4.69868C5.23737 0.792969 5.50671 0.792969 5.72459 0.864134C6.16128 1.00677 6.5037 1.34919 6.64633 1.78588C6.7175 2.00376 6.7175 2.2731 6.7175 2.81179C6.7175 3.35048 6.7175 3.61983 6.64633 3.83771C6.5037 4.27439 6.16128 4.61682 5.72459 4.75945C5.50671 4.83062 5.23737 4.83062 4.69868 4.83062H3.53443C3.42259 4.83062 3.36668 4.83062 3.31249 4.83471C3.04411 4.855 2.78679 4.95009 2.56972 5.1092C2.52589 5.14132 2.48341 5.17768 2.39845 5.25041C2.25625 5.37213 2.18514 5.433 2.1328 5.45926C1.85771 5.59733 1.52559 5.44444 1.45158 5.14567C1.4375 5.08883 1.4375 4.99523 1.4375 4.80804Z"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">12</span>
                              </div>
                              <div className="ml-auto flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle
                                    cx="4.24312"
                                    cy="3.90328"
                                    r="3.04"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4.36401 2.26562L4.36401 3.43486C4.36401 3.69316 4.15462 3.90255 3.89632 3.90255L2.96094 3.90255"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">9</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute z-[1] flex w-[140px] flex-col rounded-[8px] border border-neutral-dark-900 bg-white"
                            style={{top: "286px", left: "24px", transform: "translateY(-150px) translateZ(0px)"}}
                          >
                            <div className="flex flex-row items-center gap-[4px] px-[8px] py-[6px]">
                              <div
                                className="flex h-[10px] w-[10px] items-center justify-center rounded-full"
                                style={{backgroundColor: "rgb(15, 107, 233)"}}
                              >
                                <span className="font-inter text-[6px] font-medium text-white">T</span>
                              </div>
                              <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337] underline decoration-neutral-dark-900 underline-offset-4">
                                Terry Stein
                              </span>
                            </div>
                            <div className="my-[2px] h-[1px] w-[100%] bg-neutral-dark-900" />
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141538)">
                                    <path
                                      d="M3.05451 8.94191H7.26799C7.69505 8.94191 8.04125 8.59571 8.04125 8.16865C8.04125 7.11116 7.18399 6.25391 6.12651 6.25391H5.16125H4.19599C3.13851 6.25391 2.28125 7.11116 2.28125 8.16865C2.28125 8.59571 2.62745 8.94191 3.05451 8.94191Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <circle
                                      cx="5.22906"
                                      cy="3.34234"
                                      r="1.44"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141538">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.941406)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(208, 253, 218)", color: "rgb(20, 101, 64)"}}
                                >
                                  Product Designer
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141552)">
                                    <path
                                      d="M1.72462 8.17962H6.19194C6.59214 8.17962 6.91656 7.8552 6.91656 7.455C6.91656 6.42275 6.07975 5.58594 5.0475 5.58594H3.95828L2.86906 5.58594C1.83681 5.58594 1 6.42275 1 7.455C1 7.8552 1.32442 8.17962 1.72462 8.17962Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <ellipse
                                      cx="4.02602"
                                      cy="2.61512"
                                      rx="1.47914"
                                      ry="1.4784"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.54688 5.60156C8.54511 5.74023 9.32164 6.59506 9.32164 7.63187C9.32164 8.08289 8.85954 8.04584 8.52852 8.04584H8.12062"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.21875 4.10093C7.03566 4.10093 7.69789 3.43737 7.69789 2.61882C7.69789 1.80028 7.03566 1.13672 6.21875 1.13672"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141552">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.179688)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(220, 243, 254)", color: "rgb(6, 98, 125)"}}
                                >
                                  Design
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141566)">
                                    <path
                                      d="M5.16031 7.82187L3.88031 7.82187C2.98423 7.82187 2.53619 7.82187 2.19393 7.64748C1.89287 7.49409 1.6481 7.24932 1.4947 6.94826C1.32031 6.606 1.32031 6.15796 1.32031 5.26187L1.32031 3.98187C1.32031 3.08579 1.32031 2.63775 1.4947 2.29549C1.6481 1.99443 1.89287 1.74966 2.19393 1.59626C2.53619 1.42187 2.98423 1.42187 3.88031 1.42187L6.76031 1.42187C7.35592 1.42187 7.65373 1.42187 7.89474 1.50018C8.38184 1.65845 8.76373 2.04035 8.922 2.52745C8.98484 2.72084 8.99726 4.23081 8.99971 4.62187"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M5.99219 6.63562L8.68019 6.63562M8.68019 6.63562L7.60499 5.51562M8.68019 6.63562L7.60499 7.75562"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.92188 3.5L7.40187 3.5"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.36719 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.95312 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141566">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.140625)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">In 3 days</span>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141584)">
                                    <path
                                      d="M8.36094 4.75237C8.36094 7.11874 6.39491 9.14094 5.16094 9.14094C3.92696 9.14094 1.96094 7.11874 1.96094 4.75237C1.96094 2.93456 3.39363 1.46094 5.16094 1.46094C6.92825 1.46094 8.36094 2.93456 8.36094 4.75237Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                    />
                                    <circle cx="5.15906" cy="4.65906" r="1.12" stroke="#5E5E5E" strokeWidth="0.704" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141584">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.820312)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">New York</span>
                              </div>
                            </div>
                            <div className="mt-[4px] flex flex-row gap-[8px] px-[8px] py-[4px]">
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M5.48063 0.542969L3.68862 0.542969C2.97175 0.542969 2.61332 0.542969 2.33951 0.682481C2.09867 0.805199 1.90285 1.00102 1.78013 1.24186C1.64062 1.51567 1.64062 1.87444 1.64063 2.59197C1.64063 3.56708 1.64064 4.23887 1.64064 5.21397C1.64065 5.93152 1.64065 6.29029 1.78016 6.56409C1.90288 6.80494 2.09869 7.00075 2.33954 7.12347C2.61335 7.26298 2.97178 7.26298 3.68865 7.26298H5.35262C6.06949 7.26298 6.42792 7.26298 6.70173 7.12347C6.94258 7.00075 7.13839 6.80494 7.26111 6.56409C7.40062 6.29028 7.40062 5.93185 7.40062 5.21498L7.40062 2.46297M5.48063 0.542969V1.69497C5.48063 1.9638 5.48063 2.09821 5.53295 2.20089C5.57897 2.29121 5.6524 2.36464 5.74272 2.41066C5.8454 2.46297 5.97981 2.46297 6.24863 2.46297H7.40062M5.48063 0.542969L6.44063 1.50297L7.40062 2.46297"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="w-[4px]" />
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M2.75781 4.10895L2.82648 4.23297C3.05688 4.64914 3.17208 4.85722 3.3249 4.92739C3.45815 4.98858 3.61123 4.98971 3.74536 4.93049C3.89919 4.86257 4.01744 4.6562 4.25395 4.24347L4.99781 2.94531"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <rect
                                    x="0.835938"
                                    y="0.863281"
                                    width="6.08"
                                    height="6.08"
                                    rx="1.28"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">2</span>
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M7.59106 3.00815C7.89745 3.24213 8.10667 3.59634 8.14952 4.00156C8.1575 4.07705 8.1575 4.16674 8.1575 4.3461V6.28977C8.1575 6.49495 8.1575 6.59754 8.13953 6.66135C8.0619 6.93703 7.76168 7.08381 7.49644 6.97578C7.43504 6.95077 7.35408 6.88777 7.19215 6.76176C7.09736 6.688 7.04997 6.65112 7.00096 6.61902C6.79971 6.48718 6.56863 6.40786 6.32883 6.38832C6.27044 6.38356 6.21039 6.38356 6.09028 6.38356H4.38809C4.32255 6.38356 4.28978 6.38356 4.26207 6.38249C3.82472 6.36564 3.43779 6.15459 3.18494 5.83297M1.4375 4.80804V3.09697C1.4375 2.29049 1.4375 1.88726 1.59445 1.57922C1.73251 1.30827 1.9528 1.08798 2.22375 0.949919C2.53179 0.792969 2.93502 0.792969 3.7415 0.792969H4.69868C5.23737 0.792969 5.50671 0.792969 5.72459 0.864134C6.16128 1.00677 6.5037 1.34919 6.64633 1.78588C6.7175 2.00376 6.7175 2.2731 6.7175 2.81179C6.7175 3.35048 6.7175 3.61983 6.64633 3.83771C6.5037 4.27439 6.16128 4.61682 5.72459 4.75945C5.50671 4.83062 5.23737 4.83062 4.69868 4.83062H3.53443C3.42259 4.83062 3.36668 4.83062 3.31249 4.83471C3.04411 4.855 2.78679 4.95009 2.56972 5.1092C2.52589 5.14132 2.48341 5.17768 2.39845 5.25041C2.25625 5.37213 2.18514 5.433 2.1328 5.45926C1.85771 5.59733 1.52559 5.44444 1.45158 5.14567C1.4375 5.08883 1.4375 4.99523 1.4375 4.80804Z"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">4</span>
                              </div>
                              <div className="ml-auto flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle
                                    cx="4.24312"
                                    cy="3.90328"
                                    r="3.04"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4.36401 2.26562L4.36401 3.43486C4.36401 3.69316 4.15462 3.90255 3.89632 3.90255L2.96094 3.90255"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">3</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute z-[1] flex w-[140px] flex-col rounded-[8px] border border-neutral-dark-900 bg-white"
                            style={{top: "136px", left: "176px", transform: "translateX(150px) translateY(150px) scale(1) translateZ(0px)", zIndex: "4", borderColor: "rgb(238, 239, 241)", backgroundColor: "rgb(255, 255, 255)"}}
                          >
                            <div className="flex flex-row items-center gap-[4px] px-[8px] py-[6px]">
                              <div
                                className="flex h-[10px] w-[10px] items-center justify-center rounded-full"
                                style={{backgroundColor: "rgb(25, 170, 108)"}}
                              >
                                <span className="font-inter text-[6px] font-medium text-white">C</span>
                              </div>
                              <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337] underline decoration-neutral-dark-900 underline-offset-4">
                                Chelsea Wright
                              </span>
                            </div>
                            <div className="my-[2px] h-[1px] w-[100%] bg-neutral-dark-900" />
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141538)">
                                    <path
                                      d="M3.05451 8.94191H7.26799C7.69505 8.94191 8.04125 8.59571 8.04125 8.16865C8.04125 7.11116 7.18399 6.25391 6.12651 6.25391H5.16125H4.19599C3.13851 6.25391 2.28125 7.11116 2.28125 8.16865C2.28125 8.59571 2.62745 8.94191 3.05451 8.94191Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <circle
                                      cx="5.22906"
                                      cy="3.34234"
                                      r="1.44"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141538">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.941406)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(208, 253, 218)", color: "rgb(20, 101, 64)"}}
                                >
                                  Sales Engineer
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141552)">
                                    <path
                                      d="M1.72462 8.17962H6.19194C6.59214 8.17962 6.91656 7.8552 6.91656 7.455C6.91656 6.42275 6.07975 5.58594 5.0475 5.58594H3.95828L2.86906 5.58594C1.83681 5.58594 1 6.42275 1 7.455C1 7.8552 1.32442 8.17962 1.72462 8.17962Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <ellipse
                                      cx="4.02602"
                                      cy="2.61512"
                                      rx="1.47914"
                                      ry="1.4784"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.54688 5.60156C8.54511 5.74023 9.32164 6.59506 9.32164 7.63187C9.32164 8.08289 8.85954 8.04584 8.52852 8.04584H8.12062"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.21875 4.10093C7.03566 4.10093 7.69789 3.43737 7.69789 2.61882C7.69789 1.80028 7.03566 1.13672 6.21875 1.13672"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141552">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.179688)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(254, 236, 240)", color: "rgb(172, 9, 79)"}}
                                >
                                  Sales
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141566)">
                                    <path
                                      d="M5.16031 7.82187L3.88031 7.82187C2.98423 7.82187 2.53619 7.82187 2.19393 7.64748C1.89287 7.49409 1.6481 7.24932 1.4947 6.94826C1.32031 6.606 1.32031 6.15796 1.32031 5.26187L1.32031 3.98187C1.32031 3.08579 1.32031 2.63775 1.4947 2.29549C1.6481 1.99443 1.89287 1.74966 2.19393 1.59626C2.53619 1.42187 2.98423 1.42187 3.88031 1.42187L6.76031 1.42187C7.35592 1.42187 7.65373 1.42187 7.89474 1.50018C8.38184 1.65845 8.76373 2.04035 8.922 2.52745C8.98484 2.72084 8.99726 4.23081 8.99971 4.62187"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M5.99219 6.63562L8.68019 6.63562M8.68019 6.63562L7.60499 5.51562M8.68019 6.63562L7.60499 7.75562"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.92188 3.5L7.40187 3.5"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.36719 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.95312 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141566">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.140625)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">In 7 days</span>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141584)">
                                    <path
                                      d="M8.36094 4.75237C8.36094 7.11874 6.39491 9.14094 5.16094 9.14094C3.92696 9.14094 1.96094 7.11874 1.96094 4.75237C1.96094 2.93456 3.39363 1.46094 5.16094 1.46094C6.92825 1.46094 8.36094 2.93456 8.36094 4.75237Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                    />
                                    <circle cx="5.15906" cy="4.65906" r="1.12" stroke="#5E5E5E" strokeWidth="0.704" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141584">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.820312)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">New York</span>
                              </div>
                            </div>
                            <div className="mt-[4px] flex flex-row gap-[8px] px-[8px] py-[4px]">
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M5.48063 0.542969L3.68862 0.542969C2.97175 0.542969 2.61332 0.542969 2.33951 0.682481C2.09867 0.805199 1.90285 1.00102 1.78013 1.24186C1.64062 1.51567 1.64062 1.87444 1.64063 2.59197C1.64063 3.56708 1.64064 4.23887 1.64064 5.21397C1.64065 5.93152 1.64065 6.29029 1.78016 6.56409C1.90288 6.80494 2.09869 7.00075 2.33954 7.12347C2.61335 7.26298 2.97178 7.26298 3.68865 7.26298H5.35262C6.06949 7.26298 6.42792 7.26298 6.70173 7.12347C6.94258 7.00075 7.13839 6.80494 7.26111 6.56409C7.40062 6.29028 7.40062 5.93185 7.40062 5.21498L7.40062 2.46297M5.48063 0.542969V1.69497C5.48063 1.9638 5.48063 2.09821 5.53295 2.20089C5.57897 2.29121 5.6524 2.36464 5.74272 2.41066C5.8454 2.46297 5.97981 2.46297 6.24863 2.46297H7.40062M5.48063 0.542969L6.44063 1.50297L7.40062 2.46297"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="w-[4px]" />
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M2.75781 4.10895L2.82648 4.23297C3.05688 4.64914 3.17208 4.85722 3.3249 4.92739C3.45815 4.98858 3.61123 4.98971 3.74536 4.93049C3.89919 4.86257 4.01744 4.6562 4.25395 4.24347L4.99781 2.94531"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <rect
                                    x="0.835938"
                                    y="0.863281"
                                    width="6.08"
                                    height="6.08"
                                    rx="1.28"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">4</span>
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M7.59106 3.00815C7.89745 3.24213 8.10667 3.59634 8.14952 4.00156C8.1575 4.07705 8.1575 4.16674 8.1575 4.3461V6.28977C8.1575 6.49495 8.1575 6.59754 8.13953 6.66135C8.0619 6.93703 7.76168 7.08381 7.49644 6.97578C7.43504 6.95077 7.35408 6.88777 7.19215 6.76176C7.09736 6.688 7.04997 6.65112 7.00096 6.61902C6.79971 6.48718 6.56863 6.40786 6.32883 6.38832C6.27044 6.38356 6.21039 6.38356 6.09028 6.38356H4.38809C4.32255 6.38356 4.28978 6.38356 4.26207 6.38249C3.82472 6.36564 3.43779 6.15459 3.18494 5.83297M1.4375 4.80804V3.09697C1.4375 2.29049 1.4375 1.88726 1.59445 1.57922C1.73251 1.30827 1.9528 1.08798 2.22375 0.949919C2.53179 0.792969 2.93502 0.792969 3.7415 0.792969H4.69868C5.23737 0.792969 5.50671 0.792969 5.72459 0.864134C6.16128 1.00677 6.5037 1.34919 6.64633 1.78588C6.7175 2.00376 6.7175 2.2731 6.7175 2.81179C6.7175 3.35048 6.7175 3.61983 6.64633 3.83771C6.5037 4.27439 6.16128 4.61682 5.72459 4.75945C5.50671 4.83062 5.23737 4.83062 4.69868 4.83062H3.53443C3.42259 4.83062 3.36668 4.83062 3.31249 4.83471C3.04411 4.855 2.78679 4.95009 2.56972 5.1092C2.52589 5.14132 2.48341 5.17768 2.39845 5.25041C2.25625 5.37213 2.18514 5.433 2.1328 5.45926C1.85771 5.59733 1.52559 5.44444 1.45158 5.14567C1.4375 5.08883 1.4375 4.99523 1.4375 4.80804Z"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">2</span>
                              </div>
                              <div className="ml-auto flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle
                                    cx="4.24312"
                                    cy="3.90328"
                                    r="3.04"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4.36401 2.26562L4.36401 3.43486C4.36401 3.69316 4.15462 3.90255 3.89632 3.90255L2.96094 3.90255"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">3</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute z-[1] flex w-[140px] flex-col rounded-[8px] border border-neutral-dark-900 bg-white"
                            style={{top: "416px", left: "176px"}}
                          >
                            <div className="flex flex-row items-center gap-[4px] px-[8px] py-[6px]">
                              <div
                                className="flex h-[10px] w-[10px] items-center justify-center rounded-full"
                                style={{backgroundColor: "rgb(6, 160, 198)"}}
                              >
                                <span className="font-inter text-[6px] font-medium text-white">L</span>
                              </div>
                              <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337] underline decoration-neutral-dark-900 underline-offset-4">
                                Lori Simpson
                              </span>
                            </div>
                            <div className="my-[2px] h-[1px] w-[100%] bg-neutral-dark-900" />
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141538)">
                                    <path
                                      d="M3.05451 8.94191H7.26799C7.69505 8.94191 8.04125 8.59571 8.04125 8.16865C8.04125 7.11116 7.18399 6.25391 6.12651 6.25391H5.16125H4.19599C3.13851 6.25391 2.28125 7.11116 2.28125 8.16865C2.28125 8.59571 2.62745 8.94191 3.05451 8.94191Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <circle
                                      cx="5.22906"
                                      cy="3.34234"
                                      r="1.44"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141538">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.941406)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(208, 253, 218)", color: "rgb(20, 101, 64)"}}
                                >
                                  Director
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141552)">
                                    <path
                                      d="M1.72462 8.17962H6.19194C6.59214 8.17962 6.91656 7.8552 6.91656 7.455C6.91656 6.42275 6.07975 5.58594 5.0475 5.58594H3.95828L2.86906 5.58594C1.83681 5.58594 1 6.42275 1 7.455C1 7.8552 1.32442 8.17962 1.72462 8.17962Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <ellipse
                                      cx="4.02602"
                                      cy="2.61512"
                                      rx="1.47914"
                                      ry="1.4784"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.54688 5.60156C8.54511 5.74023 9.32164 6.59506 9.32164 7.63187C9.32164 8.08289 8.85954 8.04584 8.52852 8.04584H8.12062"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.21875 4.10093C7.03566 4.10093 7.69789 3.43737 7.69789 2.61882C7.69789 1.80028 7.03566 1.13672 6.21875 1.13672"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141552">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.179688)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(254, 236, 240)", color: "rgb(172, 9, 79)"}}
                                >
                                  Finance
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141566)">
                                    <path
                                      d="M5.16031 7.82187L3.88031 7.82187C2.98423 7.82187 2.53619 7.82187 2.19393 7.64748C1.89287 7.49409 1.6481 7.24932 1.4947 6.94826C1.32031 6.606 1.32031 6.15796 1.32031 5.26187L1.32031 3.98187C1.32031 3.08579 1.32031 2.63775 1.4947 2.29549C1.6481 1.99443 1.89287 1.74966 2.19393 1.59626C2.53619 1.42187 2.98423 1.42187 3.88031 1.42187L6.76031 1.42187C7.35592 1.42187 7.65373 1.42187 7.89474 1.50018C8.38184 1.65845 8.76373 2.04035 8.922 2.52745C8.98484 2.72084 8.99726 4.23081 8.99971 4.62187"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M5.99219 6.63562L8.68019 6.63562M8.68019 6.63562L7.60499 5.51562M8.68019 6.63562L7.60499 7.75562"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.92188 3.5L7.40187 3.5"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.36719 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.95312 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141566">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.140625)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">In 6 days</span>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141584)">
                                    <path
                                      d="M8.36094 4.75237C8.36094 7.11874 6.39491 9.14094 5.16094 9.14094C3.92696 9.14094 1.96094 7.11874 1.96094 4.75237C1.96094 2.93456 3.39363 1.46094 5.16094 1.46094C6.92825 1.46094 8.36094 2.93456 8.36094 4.75237Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                    />
                                    <circle cx="5.15906" cy="4.65906" r="1.12" stroke="#5E5E5E" strokeWidth="0.704" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141584">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.820312)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">Barcelona</span>
                              </div>
                            </div>
                            <div className="mt-[4px] flex flex-row gap-[8px] px-[8px] py-[4px]">
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M5.48063 0.542969L3.68862 0.542969C2.97175 0.542969 2.61332 0.542969 2.33951 0.682481C2.09867 0.805199 1.90285 1.00102 1.78013 1.24186C1.64062 1.51567 1.64062 1.87444 1.64063 2.59197C1.64063 3.56708 1.64064 4.23887 1.64064 5.21397C1.64065 5.93152 1.64065 6.29029 1.78016 6.56409C1.90288 6.80494 2.09869 7.00075 2.33954 7.12347C2.61335 7.26298 2.97178 7.26298 3.68865 7.26298H5.35262C6.06949 7.26298 6.42792 7.26298 6.70173 7.12347C6.94258 7.00075 7.13839 6.80494 7.26111 6.56409C7.40062 6.29028 7.40062 5.93185 7.40062 5.21498L7.40062 2.46297M5.48063 0.542969V1.69497C5.48063 1.9638 5.48063 2.09821 5.53295 2.20089C5.57897 2.29121 5.6524 2.36464 5.74272 2.41066C5.8454 2.46297 5.97981 2.46297 6.24863 2.46297H7.40062M5.48063 0.542969L6.44063 1.50297L7.40062 2.46297"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="w-[4px]" />
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M2.75781 4.10895L2.82648 4.23297C3.05688 4.64914 3.17208 4.85722 3.3249 4.92739C3.45815 4.98858 3.61123 4.98971 3.74536 4.93049C3.89919 4.86257 4.01744 4.6562 4.25395 4.24347L4.99781 2.94531"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <rect
                                    x="0.835938"
                                    y="0.863281"
                                    width="6.08"
                                    height="6.08"
                                    rx="1.28"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">3</span>
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M7.59106 3.00815C7.89745 3.24213 8.10667 3.59634 8.14952 4.00156C8.1575 4.07705 8.1575 4.16674 8.1575 4.3461V6.28977C8.1575 6.49495 8.1575 6.59754 8.13953 6.66135C8.0619 6.93703 7.76168 7.08381 7.49644 6.97578C7.43504 6.95077 7.35408 6.88777 7.19215 6.76176C7.09736 6.688 7.04997 6.65112 7.00096 6.61902C6.79971 6.48718 6.56863 6.40786 6.32883 6.38832C6.27044 6.38356 6.21039 6.38356 6.09028 6.38356H4.38809C4.32255 6.38356 4.28978 6.38356 4.26207 6.38249C3.82472 6.36564 3.43779 6.15459 3.18494 5.83297M1.4375 4.80804V3.09697C1.4375 2.29049 1.4375 1.88726 1.59445 1.57922C1.73251 1.30827 1.9528 1.08798 2.22375 0.949919C2.53179 0.792969 2.93502 0.792969 3.7415 0.792969H4.69868C5.23737 0.792969 5.50671 0.792969 5.72459 0.864134C6.16128 1.00677 6.5037 1.34919 6.64633 1.78588C6.7175 2.00376 6.7175 2.2731 6.7175 2.81179C6.7175 3.35048 6.7175 3.61983 6.64633 3.83771C6.5037 4.27439 6.16128 4.61682 5.72459 4.75945C5.50671 4.83062 5.23737 4.83062 4.69868 4.83062H3.53443C3.42259 4.83062 3.36668 4.83062 3.31249 4.83471C3.04411 4.855 2.78679 4.95009 2.56972 5.1092C2.52589 5.14132 2.48341 5.17768 2.39845 5.25041C2.25625 5.37213 2.18514 5.433 2.1328 5.45926C1.85771 5.59733 1.52559 5.44444 1.45158 5.14567C1.4375 5.08883 1.4375 4.99523 1.4375 4.80804Z"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">11</span>
                              </div>
                              <div className="ml-auto flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle
                                    cx="4.24312"
                                    cy="3.90328"
                                    r="3.04"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4.36401 2.26562L4.36401 3.43486C4.36401 3.69316 4.15462 3.90255 3.89632 3.90255L2.96094 3.90255"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">6</span>
                              </div>
                            </div>
                          </div>
                          <div
                            className="absolute z-[1] flex w-[140px] flex-col rounded-[8px] border border-neutral-dark-900 bg-white"
                            style={{top: "136px", left: "326px"}}
                          >
                            <div className="flex flex-row items-center gap-[4px] px-[8px] py-[6px]">
                              <div
                                className="flex h-[10px] w-[10px] items-center justify-center rounded-full"
                                style={{backgroundColor: "rgb(15, 107, 233)"}}
                              >
                                <span className="font-inter text-[6px] font-medium text-white">S</span>
                              </div>
                              <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337] underline decoration-neutral-dark-900 underline-offset-4">
                                Sandra Wise
                              </span>
                            </div>
                            <div className="my-[2px] h-[1px] w-[100%] bg-neutral-dark-900" />
                            <div className="flex flex-col">
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141538)">
                                    <path
                                      d="M3.05451 8.94191H7.26799C7.69505 8.94191 8.04125 8.59571 8.04125 8.16865C8.04125 7.11116 7.18399 6.25391 6.12651 6.25391H5.16125H4.19599C3.13851 6.25391 2.28125 7.11116 2.28125 8.16865C2.28125 8.59571 2.62745 8.94191 3.05451 8.94191Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <circle
                                      cx="5.22906"
                                      cy="3.34234"
                                      r="1.44"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141538">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.941406)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(255, 237, 203)", color: "rgb(126, 83, 8)"}}
                                >
                                  Manager
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141552)">
                                    <path
                                      d="M1.72462 8.17962H6.19194C6.59214 8.17962 6.91656 7.8552 6.91656 7.455C6.91656 6.42275 6.07975 5.58594 5.0475 5.58594H3.95828L2.86906 5.58594C1.83681 5.58594 1 6.42275 1 7.455C1 7.8552 1.32442 8.17962 1.72462 8.17962Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <ellipse
                                      cx="4.02602"
                                      cy="2.61512"
                                      rx="1.47914"
                                      ry="1.4784"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M7.54688 5.60156C8.54511 5.74023 9.32164 6.59506 9.32164 7.63187C9.32164 8.08289 8.85954 8.04584 8.52852 8.04584H8.12062"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.21875 4.10093C7.03566 4.10093 7.69789 3.43737 7.69789 2.61882C7.69789 1.80028 7.03566 1.13672 6.21875 1.13672"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141552">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.179688)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div
                                  className="rounded-[6px] px-[4px] py-[2px] text-[8px] font-medium"
                                  style={{backgroundColor: "rgb(208, 253, 218)", color: "rgb(20, 101, 64)"}}
                                >
                                  Marketing
                                </div>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141566)">
                                    <path
                                      d="M5.16031 7.82187L3.88031 7.82187C2.98423 7.82187 2.53619 7.82187 2.19393 7.64748C1.89287 7.49409 1.6481 7.24932 1.4947 6.94826C1.32031 6.606 1.32031 6.15796 1.32031 5.26187L1.32031 3.98187C1.32031 3.08579 1.32031 2.63775 1.4947 2.29549C1.6481 1.99443 1.89287 1.74966 2.19393 1.59626C2.53619 1.42187 2.98423 1.42187 3.88031 1.42187L6.76031 1.42187C7.35592 1.42187 7.65373 1.42187 7.89474 1.50018C8.38184 1.65845 8.76373 2.04035 8.922 2.52745C8.98484 2.72084 8.99726 4.23081 8.99971 4.62187"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                    />
                                    <path
                                      d="M5.99219 6.63562L8.68019 6.63562M8.68019 6.63562L7.60499 5.51562M8.68019 6.63562L7.60499 7.75562"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M2.92188 3.5L7.40187 3.5"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.36719 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.95312 0.78125V1.90125"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141566">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.140625)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">In 3 days</span>
                              </div>
                              <div className="flex flex-row items-center gap-[4px] px-[8px] py-[4px]">
                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_844_141584)">
                                    <path
                                      d="M8.36094 4.75237C8.36094 7.11874 6.39491 9.14094 5.16094 9.14094C3.92696 9.14094 1.96094 7.11874 1.96094 4.75237C1.96094 2.93456 3.39363 1.46094 5.16094 1.46094C6.92825 1.46094 8.36094 2.93456 8.36094 4.75237Z"
                                      stroke="#5E5E5E"
                                      strokeWidth="0.704"
                                    />
                                    <circle cx="5.15906" cy="4.65906" r="1.12" stroke="#5E5E5E" strokeWidth="0.704" />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_844_141584">
                                      <rect width="8.96" height="8.96" fill="white" transform="translate(0.679688 0.820312)" />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <span className="font-inter text-[9px] font-medium leading-[13px] text-[#313337]">Atlanta</span>
                              </div>
                            </div>
                            <div className="mt-[4px] flex flex-row gap-[8px] px-[8px] py-[4px]">
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M5.48063 0.542969L3.68862 0.542969C2.97175 0.542969 2.61332 0.542969 2.33951 0.682481C2.09867 0.805199 1.90285 1.00102 1.78013 1.24186C1.64062 1.51567 1.64062 1.87444 1.64063 2.59197C1.64063 3.56708 1.64064 4.23887 1.64064 5.21397C1.64065 5.93152 1.64065 6.29029 1.78016 6.56409C1.90288 6.80494 2.09869 7.00075 2.33954 7.12347C2.61335 7.26298 2.97178 7.26298 3.68865 7.26298H5.35262C6.06949 7.26298 6.42792 7.26298 6.70173 7.12347C6.94258 7.00075 7.13839 6.80494 7.26111 6.56409C7.40062 6.29028 7.40062 5.93185 7.40062 5.21498L7.40062 2.46297M5.48063 0.542969V1.69497C5.48063 1.9638 5.48063 2.09821 5.53295 2.20089C5.57897 2.29121 5.6524 2.36464 5.74272 2.41066C5.8454 2.46297 5.97981 2.46297 6.24863 2.46297H7.40062M5.48063 0.542969L6.44063 1.50297L7.40062 2.46297"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="w-[4px]" />
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M2.75781 4.10895L2.82648 4.23297C3.05688 4.64914 3.17208 4.85722 3.3249 4.92739C3.45815 4.98858 3.61123 4.98971 3.74536 4.93049C3.89919 4.86257 4.01744 4.6562 4.25395 4.24347L4.99781 2.94531"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                  <rect
                                    x="0.835938"
                                    y="0.863281"
                                    width="6.08"
                                    height="6.08"
                                    rx="1.28"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">4</span>
                              </div>
                              <div className="flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                    d="M7.59106 3.00815C7.89745 3.24213 8.10667 3.59634 8.14952 4.00156C8.1575 4.07705 8.1575 4.16674 8.1575 4.3461V6.28977C8.1575 6.49495 8.1575 6.59754 8.13953 6.66135C8.0619 6.93703 7.76168 7.08381 7.49644 6.97578C7.43504 6.95077 7.35408 6.88777 7.19215 6.76176C7.09736 6.688 7.04997 6.65112 7.00096 6.61902C6.79971 6.48718 6.56863 6.40786 6.32883 6.38832C6.27044 6.38356 6.21039 6.38356 6.09028 6.38356H4.38809C4.32255 6.38356 4.28978 6.38356 4.26207 6.38249C3.82472 6.36564 3.43779 6.15459 3.18494 5.83297M1.4375 4.80804V3.09697C1.4375 2.29049 1.4375 1.88726 1.59445 1.57922C1.73251 1.30827 1.9528 1.08798 2.22375 0.949919C2.53179 0.792969 2.93502 0.792969 3.7415 0.792969H4.69868C5.23737 0.792969 5.50671 0.792969 5.72459 0.864134C6.16128 1.00677 6.5037 1.34919 6.64633 1.78588C6.7175 2.00376 6.7175 2.2731 6.7175 2.81179C6.7175 3.35048 6.7175 3.61983 6.64633 3.83771C6.5037 4.27439 6.16128 4.61682 5.72459 4.75945C5.50671 4.83062 5.23737 4.83062 4.69868 4.83062H3.53443C3.42259 4.83062 3.36668 4.83062 3.31249 4.83471C3.04411 4.855 2.78679 4.95009 2.56972 5.1092C2.52589 5.14132 2.48341 5.17768 2.39845 5.25041C2.25625 5.37213 2.18514 5.433 2.1328 5.45926C1.85771 5.59733 1.52559 5.44444 1.45158 5.14567C1.4375 5.08883 1.4375 4.99523 1.4375 4.80804Z"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">2</span>
                              </div>
                              <div className="ml-auto flex flex-row items-center gap-[2px]">
                                <svg width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <circle
                                    cx="4.24312"
                                    cy="3.90328"
                                    r="3.04"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinejoin="round"
                                  />
                                  <path
                                    d="M4.36401 2.26562L4.36401 3.43486C4.36401 3.69316 4.15462 3.90255 3.89632 3.90255L2.96094 3.90255"
                                    stroke="#9FA1A7"
                                    strokeWidth="0.64"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span className="font-inter text-[8px] font-medium leading-[10px] text-[#313337]">7</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <picture className="relative">
                        <source
                          media="(min-width: 992px)"
                          srcSet="/scroll-frame-ITYBYWBA.webp"
                          type="image/png"
                          width="765"
                          height="366"
                        />
                        <img src="/scroll-frame-ITYBYWBA.webp" className="min-h-[366px] min-w-[765px]" alt="" />
                      </picture>
                    </div>
                  </div>
                  <picture className="relative z-[3]">
                    <source
                      media="(min-width: 992px)"
                      srcSet="/Taskility-GPS.png"
                      type="image/png"
                      width="258"
                      height="366"
                    />
                    <img alt="" loading="lazy" src="/Taskility-GPS.png" className="min-h-[366px] min-w-[258px]" />
                  </picture>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[24px] tablet:flex-row">
              <div className="overflow-hidden rounded-[20px] max-h-[540px] w-full flex-1 pt-[24px] tablet:max-w-[448px] tablet:pt-[40px] card-light-shadow bg-background-light-primary">
                <span className="inline-block max-w-[420px] px-[24px] pb-[48px] tablet:px-[40px] tablet:pb-[60px]">
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold phablet:text-base text-[#24292F]"
                  >
                    Archivos y Fotos
                  </span>{' '}
                  <span className="text-lg font-normal phablet:text-base max-w-[300px]  text-[#57606A]">
                    Sube archivos y fotos para asegurar la entrega exitosa de tus embarques. 
                  </span>
                </span>
                <div className="relative mr-auto mt-auto">
                  <img alt="" loading="lazy" src="/Upload.png" className="phablet:h-[266px]" />
                  {/* <div
                    className="absolute left-[30px] top-[5px] flex w-[408px] flex-col rounded-[12px] border border-neutral-dark-900 bg-white opacity-0"
                    style={{opacity: "1", transform: "translateY(41px) translateZ(0px)"}}
                  >
                    <div className="flex flex-row items-center px-[12px] py-[8px]">
                      <span className="font-inter text-[10px] font-medium leading-[16px] text-[#5E5E5E]">List access</span>
                    </div>
                    <div className="mt-[10px] flex flex-row items-center px-[12px]">
                      <picture className="mr-[12px]">
                        <source
                          media="(min-width: 992px)"
                          srcSet="/Upload.png"
                          type="image/png"
                          width="34"
                          height="34"
                        />
                        <img
                          src="/Upload.png"
                          loading="lazy"
                          alt=""
                          className="h-[34px] min-h-[34px] w-[34px] min-w-[34px] rounded-[12px]"
                        />
                      </picture>
                      <span className="font-inter text-[14px] font-medium leading-[12px] text-[#313337]">Workspace Access</span>
                      <div className="mock-button-secondary ml-auto">
                        <span className="font-inter text-[14px] font-medium leading-[20px] -tracking-[0.2px] text-[#111111]">
                          Full Access
                        </span>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.3332 9.14355L9.99984 12.4769L6.6665 9.14355"
                            stroke="#767676"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="mt-[10px] px-[12px] font-inter text-[11px] font-medium leading-[16px] text-[#5E5E5E]">
                      This list is public to your workspace and can be edited by all members.
                    </span>
                    <span className="my-[11px] h-[1px] w-[100%] bg-neutral-dark-900" />
                    <div className="flex items-start gap-[8px] px-[12px]">
                      <div
                        className="w-[100%] rounded-[8px] border border-neutral-dark-900 px-[8px] py-[4px]"
                        style={{borderColor: "rgb(238, 239, 241)"}}
                      >
                        <div
                          className="py-4x flex max-w-[118px] items-center rounded-[8px] px-[4px]"
                          style={{backgroundColor: "rgb(231, 231, 231)", opacity: "0"}}
                        >
                          <div
                            className="w-[0px] overflow-hidden font-inter text-[12px] font-medium leading-[20px] text-[#353535]"
                            style={{width: "30px", opacity: "0"}}
                          >
                            andr
                          </div>
                          <div
                            className="ml-[-4px] w-[0px] overflow-hidden font-inter text-[12px] font-medium leading-[20px] text-[#353535]"
                            style={{width: "80px", opacity: "0"}}
                          >
                            ea@attio.com
                          </div>
                        </div>
                        <div className="relative ml-auto opacity-0" style={{opacity: "1"}}>
                          <div
                            className="absolute right-[-2px] top-[-20px] flex items-center whitespace-nowrap rounded-[8px] pl-[8px]"
                            style={{backgroundColor: "rgba(206, 206, 206, 0.56)", opacity: "0"}}
                          >
                            <span className="font-inter text-[12px] font-medium leading-[20px] text-[#5E5E5E]">Full access</span>
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="shrink-0"
                            >
                              <path
                                d="M13.3332 9.14355L9.99984 12.4769L6.6665 9.14355"
                                stroke="#767676"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <div
                            className="absolute right-[-2px] top-[-20px] flex items-center whitespace-nowrap rounded-[8px] opacity-0"
                            style={{opacity: "0"}}
                          >
                            <span className="font-inter text-[12px] font-medium leading-[20px] text-[#5E5E5E]">Read only</span>
                            <svg
                              width="20"
                              height="21"
                              viewBox="0 0 20 21"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="shrink-0"
                            >
                              <path
                                d="M13.3332 9.14355L9.99984 12.4769L6.6665 9.14355"
                                stroke="#767676"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="mock-button-primary" style={{backgroundColor: "rgb(15, 107, 233)"}}>
                        <span className="font-inter text-[14px] font-medium leading-[20px] -tracking-[0.2px] text-[#FFFFFF]">Invite</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px] px-[12px] py-[8px]">
                      <div
                        className="flex h-[24px] w-[24px] items-center justify-center rounded-full font-inter text-[14px] font-medium leading-[14px] text-white"
                        style={{backgroundColor:"#0F6BE9"}}
                      >
                        L
                      </div>
                      <div className="font-inter text-[14px] font-medium leading-[20px]">
                        <span className="text-[#383A3F]">Lauren Scott</span>
                        <span className="text-[#A0A0A0]"> (you)</span>
                      </div>
                      <span className="ml-auto font-inter text-[14px] font-medium leading-[20px] text-[#5E5E5E]">Full access</span>
                    </div>
                    <div className="flex items-center gap-[8px] px-[12px] h-[0px] opacity-0" style={{opacity: "1", height: "32px"}}>
                      <div
                        className="flex h-[24px] w-[24px] items-center justify-center rounded-full font-inter text-[14px] font-medium leading-[14px] text-white"
                        style={{backgroundColor:"#19AA6C"}}
                      >
                        A
                      </div>
                      <div className="font-inter text-[14px] font-medium leading-[20px]">
                        <span className="text-[#383A3F]">andrea@attio.com</span>
                      </div>
                      <span className="ml-auto font-inter text-[14px] font-medium leading-[20px] text-[#5E5E5E]">Read only</span>
                    </div>
                    <span className="mb-[4px] mt-[3px] h-[1px] w-[100%] bg-neutral-dark-900" />
                    <div className="flex items-center gap-[4px] px-[12px] pb-[8px]">
                      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle
                          cx="10"
                          cy="10.8101"
                          r="5.5"
                          stroke="#969696"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.0161 12.6841V11.0545"
                          stroke="#969696"
                          strokeWidth="1.1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <ellipse cx="9.9998" cy="9.21853" rx="0.7" ry="0.699973" fill="#969696" />
                      </svg>
                      <span className="font-inter text-[12px] font-medium leading-[16px] text-[#969696]">Learn about list access</span>
                    </div>
                  </div>
                  <div
                    className="absolute left-[42px] top-[200px] flex w-[384px] flex-col rounded-[12px] border border-neutral-dark-900 bg-white opacity-0"
                    style={{opacity: "0", transform: "translateY(11px) translateZ(0px)"}}
                  >
                    <div className="flex flex-row items-center px-[12px] py-[8px]">
                      <span className="font-inter text-[10px] font-medium leading-[16px] text-[#5E5E5E]">Users</span>
                    </div>
                    <div className="flex items-center gap-[8px] px-[12px] py-[8px]" style={{backgroundColor: "rgba(15, 107, 233, 0.1)"}}>
                      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#19AA6C] font-inter text-[14px] font-medium leading-[14px] text-white">
                        A
                      </div>
                      <div className="font-inter text-[14px] font-medium leading-[20px]">
                        <span className="text-[#383A3F]">andrea@attio.com</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px] px-[12px] py-[8px]">
                      <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#0F6BE9] font-inter text-[14px] font-medium leading-[14px] text-white">
                        A
                      </div>
                      <div className="font-inter text-[14px] font-medium leading-[20px]">
                        <span className="text-[#383A3F]">andrew@progression.io</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="absolute right-[52px] top-[190px] flex w-[260px] flex-col rounded-[12px] border border-neutral-dark-900 bg-white opacity-0"
                    style={{opacity: "0", transform: "translateY(11px) translateZ(0px)"}}
                  >
                    <div className="flex flex-row items-center px-[12px] py-[4px]">
                      <span className="font-inter text-[10px] font-medium leading-[16px] text-[#5E5E5E]">Permissions</span>
                    </div>
                    <div className="flex flex-col items-start px-[12px] py-[4px]">
                      <span className="font-inter  text-[14px] font-medium leading-[20px] text-[#383A3F]">Full access</span>
                      <span className="font-inter text-[10px] font-medium leading-[12px] text-[#5e5e5e]">
                        Can configure list and share with others
                      </span>
                    </div>
                    <div className="flex flex-col items-start px-[12px] py-[4px]">
                      <span className="font-inter  text-[14px] font-medium leading-[20px] text-[#383A3F]">Read and write</span>
                      <span className="font-inter text-[10px] font-medium leading-[12px] text-[#5e5e5e]">
                        Can edit list data, but not share with others
                      </span>
                    </div>
                    <div
                      className="flex flex-col items-start px-[12px] py-[4px] font-inter text-[14px] font-medium leading-[20px]"
                      style={{backgroundColor: "rgba(15, 107, 233, 0.1)"}}
                    >
                      <span className="font-inter  text-[14px] font-medium leading-[20px] text-[#383A3F]">Read only</span>
                      <span className="font-inter text-[10px] font-medium leading-[12px] text-[#5e5e5e]">Can only view list data</span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="overflow-hidden rounded-[20px] relative max-h-[540px] min-h-[440px] w-full flex-1 px-[24px] py-[24px] phablet:min-h-[480px] tablet:max-w-[100%] tablet:px-[40px] tablet:py-[40px] card-light-shadow bg-background-light-primary">
                <span className="inline-block max-w-[420px] pb-[40px] phablet:pb-[60px]">
                  <span
                    role="heading"
                    aria-level={3}
                    className="text-lg font-semibold phablet:text-base text-[#24292F]"
                  >
                    Encuestas de satisfacción
                  </span>{' '}
                  <span className="text-lg font-normal phablet:text-base max-w-[300px]  text-[#57606A]">
                    Identifica áreas de mejora y asegura la satisfacción del cliente en cada embarque.
                  </span>
                </span>
                <div className="note-shadow absolute max-w-[604px] overflow-hidden rounded-[12px] desktop:bottom-[18px] desktop:right-[18px] ml-auto phablet:mr-auto">
                  <img src="/Stars.png" alt="" loading="lazy" className="min-w-[320px] max-w-[480px]" />
                  {/* <div className="absolute left-[60px] top-[194px]">
                    <li
                      className="ml-[-10px] whitespace-nowrap font-inter  text-[14px] font-medium leading-[24px] -tracking-[0.3px] text-[#5E5E5E]"
                      style={{opacity: "1"}}
                    >
                      <span style={{opacity: "1", transform: "none"}}>H</span>
                      <span style={{opacity: "1", transform: "none"}}>a</span>
                      <span style={{opacity: "1", transform: "none"}}>d</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>h</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>i</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>c</span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>s</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>p</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>f</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>1</span>
                      <span style={{opacity: "1", transform: "none"}}>0</span>
                      <span style={{opacity: "1", transform: "none"}}>+</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>y</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>a</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>s</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>-</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>b</span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>c</span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>s</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>l</span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>i</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>c</span>
                      <span style={{opacity: "1", transform: "none"}}>a</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>’</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>k</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>p</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>p</span>
                    </li>
                    <li
                      className="ml-[-10px] whitespace-nowrap font-inter  text-[14px] font-medium leading-[24px] -tracking-[0.3px] text-[#5E5E5E]"
                      style={{opacity: "1"}}
                    >
                      <span style={{opacity: "1", transform: "none"}}>I</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>s</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>d</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>i</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>a</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>p</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>f</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>f</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>c</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>c</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>p</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>,</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>w</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}>r</span>
                      <span style={{opacity: "1", transform: "none"}}>k</span>
                      <span style={{opacity: "1", transform: "none"}}>i</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>g</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>o</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>s</span>
                      <span style={{opacity: "1", transform: "none"}}>c</span>
                      <span style={{opacity: "1", transform: "none"}}>h</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>d</span>
                      <span style={{opacity: "1", transform: "none"}}>u</span>
                      <span style={{opacity: "1", transform: "none"}}>l</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>a</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>p</span>
                      <span style={{opacity: "1", transform: "none"}}>l</span>
                      <span style={{opacity: "1", transform: "none"}}>a</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>i</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>g</span>
                      <span style={{opacity: "1", transform: "none"}}> </span>
                      <span style={{opacity: "1", transform: "none"}}>m</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>e</span>
                      <span style={{opacity: "1", transform: "none"}}>t</span>
                      <span style={{opacity: "1", transform: "none"}}>i</span>
                      <span style={{opacity: "1", transform: "none"}}>n</span>
                      <span style={{opacity: "1", transform: "none"}}>g</span>
                    </li>
                    <div
                      className="highlight absolute left-[103px] top-[26px]"
                      style={{width: "115px", borderRight: "2px solid rgb(47, 103, 221)"}}
                    />
                    <picture
                      className="absolute left-[-55px] top-[-5px] opacity-0"
                      style={{transform: "translateY(-20px) translateZ(0px)", opacity: "1"}}
                    >
                      <source
                        media="(min-width: 992px)"
                        srcSet="/toolbar-YFOCK6B7.webp"
                        type="image/png"
                        width="459"
                        height="84"
                      />
                      <img src="/toolbar-YFOCK6B7.webp" className="min-h-[84px] min-w-[459px]" alt="" />
                    </picture>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="py-[40px] tablet:px-0 tablet:pb-[160px] tablet:pt-[60px]">
              <div className="mx-auto flex max-w-[541px] flex-col tablet:items-center desktop:max-w-[606px]">
                <img className="h-[44px] w-[44px] rounded-full" src="/Alejandro_Cruz.jpg" alt="Alon Bartur" />
                <p className="text-lg font-light tablet:typography-p2-regular mt-[24px] text-typography-light-secondary tablet:text-center tablet:!leading-140">
                  “La información es el activo más valioso de la industria de la logística. Con Taskility ahora tengo la información en un solo lugar - es un verdadero cambio de juego para mí y mis clientes.”
                </p>
                <div className="mt-[24px]">
                  <div className="typography-p6-medium tablet:text-center">
                    <p className="text-sm font-normal text-tkyGrey-dark">Alejandro Z.</p>
                    <p className="mt-[2px] text-sm font-normal text-tkyGrey">Gerente Ventas &amp;, Toyota Tusho</p>
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
