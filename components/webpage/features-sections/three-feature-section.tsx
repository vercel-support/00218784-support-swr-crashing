import React from 'react'

export const ThreeFeatureSection = () => {
  return (
    <div className="tablet:pt-120px bg-white pt-60px mx-auto max-w-fit mt-60">
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
                Personaliza cada link de embarque
              </div>
              <div className="text-tkyBlue-darkKnight text-lg text-normal tablet:text-2xl mt-[16px] max-w-[480px] text-typography-light-secondary phone:whitespace-pre-line">
                Configura y personaliza cada detalle según tu operación y optimiza tu flujo de trabajo como nunca antes.
              </div>
            </div>
            <div className="relative mt-[60px] flex min-h-[380px] flex-col gap-24px tablet:mt-[80px]">
              <div className="hidden tablet:flex">
                <div className="overflow-hidden rounded-[20px] flex flex-col items-center px-[40px] pt-[36px] border border-tkyGrey-light card-light-shadow bg-background-light-primary">
                  <div className="z-10 flex w-full max-w-[1076px] flex-row gap-[24px] pb-[64px]">
                    <button type="button" className="duration-[140ms] relative flex flex-1 transform flex-col gap-[8px] overflow-hidden rounded-[12px] transition-all">
                      <div className="flex flex-row items-center gap-[8px]">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M10.0006 2.03633L7.96484 2.03633C6.06467 2.03634 5.11458 2.03634 4.3888 2.40613C3.7504 2.73142 3.23136 3.25046 2.90607 3.88887C2.53627 4.61464 2.53627 5.56473 2.53627 7.46491L2.53627 11.5363C2.53627 13.4365 2.53627 14.3865 2.90607 15.1123C3.23136 15.7507 3.7504 16.2698 4.38881 16.595C5.11458 16.9648 6.06467 16.9648 7.96485 16.9648L10.0006 16.9648M10.0006 2.03633L12.0363 2.03633C13.9364 2.03633 14.8865 2.03633 15.6123 2.40613C16.2507 2.73142 16.7698 3.25046 17.095 3.88887C17.4648 4.61464 17.4648 5.56473 17.4648 7.4649L17.4648 11.5363C17.4648 13.4364 17.4648 14.3865 17.095 15.1123C16.7698 15.7507 16.2507 16.2698 15.6123 16.595C14.8865 16.9648 13.9365 16.9648 12.0363 16.9648L10.0006 16.9648M10.0006 2.03633L10.0006 16.9648"
                            stroke="#232529"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 11.3667L2.53571 11.3667"
                            stroke="#232529"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M17.4648 7.63428L10.0006 7.63428"
                            stroke="#232529"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-[#24292F]">Plantillas</h3>
                      </div>
                      <div className="text-md font-normal text-left text-[#57606A]">
                        Ahorra tiempo precargando información repetitiva en plantillas de embarque.
                      </div>
                      <div className="absolute bottom-0 left-0 hidden h-[3px] w-full bg-greyscale-light-06 transition transform duration-[140ms] opacity-0 " />
                      <div className="absolute bottom-0 left-0 hidden h-[3px] w-full origin-left bg-brand-light-primary transition transform duration-[140ms] opacity-0 " />
                    </button>
                    <button type="button" className="duration-[140ms] relative flex flex-1 transform flex-col gap-[8px] overflow-hidden rounded-[12px] transition-all">
                      <div className="flex flex-row items-center gap-[8px]">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_943_164230)">
                            <path
                              d="M14.75 9.46127L14.75 6.78574C14.75 4.88555 14.75 3.93546 14.3802 3.20968C14.0549 2.57127 13.5359 2.05223 12.8975 1.72694C12.1717 1.35714 11.2216 1.35714 9.32141 1.35714L7.06233 1.35714C5.37256 1.35714 4.52767 1.35714 3.86798 1.65137C3.10364 1.99227 2.49227 2.60365 2.15137 3.36799C1.85714 4.02767 1.85714 4.87256 1.85714 6.56234L1.85714 8.82143C1.85714 10.7216 1.85714 11.6717 2.22694 12.3975C2.55223 13.0359 3.07127 13.5549 3.70967 13.8802C4.43545 14.25 5.38554 14.25 7.28571 14.25L9.96122 14.25C11.2605 14.25 11.9101 14.25 12.4345 14.0744C13.444 13.7364 14.2363 12.944 14.5744 11.9345C14.75 11.4101 14.75 10.7605 14.75 9.46127Z"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.464 6.10701C17.8901 6.67413 18.1426 7.37911 18.1426 8.14307L18.1426 12.8543C18.1426 13.5206 18.1426 13.8538 18.1036 14.1332C17.8526 15.936 16.4355 17.3531 14.6327 17.6042C14.3533 17.6431 14.0201 17.6431 13.3538 17.6431L9.09357 17.6431C8.21621 17.6431 7.4075 17.3491 6.76056 16.8543"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_943_164230">
                              <rect width="19" height="19" fill="white" transform="translate(19.5 19) rotate(180)" />
                            </clipPath>
                          </defs>
                        </svg>
                        <h3 className="text-lg font-semibold text-[#99A2AF]">Tags</h3>
                      </div>
                      <div className="text-md font-medium text-left text-[#99A2AF]">
                        Asocia tu embarque con multiples identificadores externos para facilitar su búsqueda y organización.
                      </div>
                    </button>
                    <button type="button" className="duration-[140ms] relative flex flex-1 transform flex-col gap-[8px] overflow-hidden rounded-[12px] transition-all">
                      <div className="flex flex-row items-center gap-[8px]">
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M6.34197 17.1338C6.34197 14.2261 7.90938 11.6058 10.817 11.6058C7.90938 11.6058 6.34197 8.98541 6.34197 6.07776C6.34197 8.98541 4.77457 11.6058 1.86691 11.6058C4.77457 11.6058 6.34197 14.2261 6.34197 17.1338Z"
                            stroke="#99A2AF"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.7127 8.71014C13.7127 6.96555 15.3902 5.28804 17.1348 5.28804C15.3902 5.28804 13.7127 3.61053 13.7127 1.86593C13.7127 3.61053 12.0351 5.28804 10.2906 5.28804C12.0351 5.28804 13.7127 6.96555 13.7127 8.71014Z"
                            stroke="#99A2AF"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-[#99A2AF]">Flexibilidad</h3>
                      </div>
                      <div className="text-mg font-normal text-left text-[#99A2AF]">
                        Seleciona los módulos de cada embarque para adaptarse a las particularidades de cualquier operación.
                      </div>
                    </button>
                    <button type="button" className="duration-[140ms] relative flex flex-1 transform flex-col gap-[8px] overflow-hidden rounded-[12px] transition-all">
                      <div className="flex flex-row items-center gap-[8px]">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect
                            x="2.53516"
                            y="2.03516"
                            width="14.9286"
                            height="14.9286"
                            rx="3.39286"
                            stroke="#99A2AF"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M6.55469 7.20264L6.55469 12.9444"
                            stroke="#99A2AF"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 6.05469V12.9448"
                            stroke="#99A2AF"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M13.4434 9.49951V12.9446"
                            stroke="#99A2AF"
                            strokeWidth="1.49286"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-[#99A2AF]">Seguridad</h3>
                      </div>
                      <div className="text-mg font-normal text-left text-[#99A2AF]">
                        Configura los permisos de cada invitado y controla que puede ver y hacer cada quién.
                      </div>
                    </button>
                  </div>
                  <div className="w-full max-w-[1204px]">
                    <div className="h-0 w-0" />
                    <link rel="preload" type="image/webp" href="/mockup-build-SIZIHVT5.webp" as="image" />
                    <div className="h-0 w-0" />
                    <link rel="preload" type="image/webp" href="/mockup-refine-QIDSIUNL.webp" as="image" />
                    <div className="h-0 w-0" />
                    <link rel="preload" type="image/webp" href="/mockup-work-HQEVF3XL.webp" as="image" />
                    <div className="h-0 w-0" />
                    <link rel="preload" type="image/webp" href="/mockup-report-JAXR6WI3.webp" as="image" />
                    <div className="w-full relative max-w-full z-10 rounded-[16px] p-[2px]">
                      <div className="relative isolate">
                        <picture className="absolute inset-0 z-10 h-full w-full opacity-0">
                          <source
                            src="/List.png"
                            media="(min-width:992px)"
                            type="image/webp"
                            height="1293"
                            width="2295"
                          />
                          <source src="/List.png" media="(min-width:992px)" height="1293" width="2295" />
                          <img
                            loading="lazy"
                            src="/List.png"
                            className="relative rounded-[25px] w-full"
                            alt="A modal shows  a list from of shipments with their Operative, Colllect and Payment Status"
                            height="889"
                            width="686"
                          />
                        </picture>
                        <picture className="relative inset-0 z-0 h-full w-full">
                          <source
                            srcSet="/List.png"
                            media="(min-width:992px)"
                            type="image/webp"
                            height="1293"
                            width="2295"
                          />
                          <source srcSet="/List.png" media="(min-width:992px)" height="1293" width="2295" />
                          <img
                            loading="lazy"
                            srcSet=""
                            className="relative rounded-[25px] w-full"
                            height="889"
                            width="686"
                            alt=""
                          />
                        </picture>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex tablet:hidden">
                <div className="absolute w-full tablet:hidden">
                  <div className="hide-scrollbar flex w-full snap-x snap-mandatory overflow-x-auto gap-12px p-4px">
                    <div className="overflow-hidden rounded-[20px] flex w-[75vw] max-w-[495px] flex-shrink-0 snap-center flex-col justify-between gap-[24px] rounded-12px pt-24px transition duration-200 card-light-shadow bg-background-light-primary">
                      <div className="flex flex-col gap-8px px-24px">
                        <div className="flex flex-row items-center gap-8px">
                          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M10.0006 2.03633L7.96484 2.03633C6.06467 2.03634 5.11458 2.03634 4.3888 2.40613C3.7504 2.73142 3.23136 3.25046 2.90607 3.88887C2.53627 4.61464 2.53627 5.56473 2.53627 7.46491L2.53627 11.5363C2.53627 13.4365 2.53627 14.3865 2.90607 15.1123C3.23136 15.7507 3.7504 16.2698 4.38881 16.595C5.11458 16.9648 6.06467 16.9648 7.96485 16.9648L10.0006 16.9648M10.0006 2.03633L12.0363 2.03633C13.9364 2.03633 14.8865 2.03633 15.6123 2.40613C16.2507 2.73142 16.7698 3.25046 17.095 3.88887C17.4648 4.61464 17.4648 5.56473 17.4648 7.4649L17.4648 11.5363C17.4648 13.4364 17.4648 14.3865 17.095 15.1123C16.7698 15.7507 16.2507 16.2698 15.6123 16.595C14.8865 16.9648 13.9365 16.9648 12.0363 16.9648L10.0006 16.9648M10.0006 2.03633L10.0006 16.9648"
                              stroke="#232529"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 11.3667L2.53571 11.3667"
                              stroke="#232529"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M17.4648 7.63428L10.0006 7.63428"
                              stroke="#232529"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <h3 className="typography-p4-strong text-[#24292F]">Build</h3>
                        </div>
                        <div className="typography-p5-medium max-w-[280px] text-left text-[#57606A]">
                          Create your dream CRM with powerful, flexible templates for every use case.
                        </div>
                      </div>
                      <div className="mx-auto flex w-[495px] justify-center overflow-hidden">
                        <div className="self-center mx-auto">
                          <div className="relative isolate">
                            <picture className="absolute inset-0 z-10 h-full w-full opacity-0">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-build-SIZIHVT5.webp" media="(max-width:991px)" type="image/webp" />
                              <img
                                loading="lazy"
                                srcSet="/mockup-build-SIZIHVT5.webp"
                                className=""
                                alt="A modal shows different options for creating a list from a template, such as Sales Pipeline, Customer Success and Enterprise Sales"
                              />
                            </picture>
                            <picture className="relative inset-0 z-0 h-full w-full">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-build-SIZIHVT5.webp" type="image/webp" media="(max-width:991px)" />
                              <img loading="lazy" srcSet="/mockup-build-SIZIHVT5.webp" className="" alt="" />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-[20px] flex w-[75vw] max-w-[495px] flex-shrink-0 snap-center flex-col justify-between gap-[24px] rounded-12px pt-24px transition duration-200 card-light-shadow bg-background-light-primary">
                      <div className="flex flex-col gap-8px px-24px">
                        <div className="flex flex-row items-center gap-8px">
                          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_943_164230)">
                              <path
                                d="M14.75 9.46127L14.75 6.78574C14.75 4.88555 14.75 3.93546 14.3802 3.20968C14.0549 2.57127 13.5359 2.05223 12.8975 1.72694C12.1717 1.35714 11.2216 1.35714 9.32141 1.35714L7.06233 1.35714C5.37256 1.35714 4.52767 1.35714 3.86798 1.65137C3.10364 1.99227 2.49227 2.60365 2.15137 3.36799C1.85714 4.02767 1.85714 4.87256 1.85714 6.56234L1.85714 8.82143C1.85714 10.7216 1.85714 11.6717 2.22694 12.3975C2.55223 13.0359 3.07127 13.5549 3.70967 13.8802C4.43545 14.25 5.38554 14.25 7.28571 14.25L9.96122 14.25C11.2605 14.25 11.9101 14.25 12.4345 14.0744C13.444 13.7364 14.2363 12.944 14.5744 11.9345C14.75 11.4101 14.75 10.7605 14.75 9.46127Z"
                                stroke="#99A2AF"
                                strokeWidth="1.49286"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M17.464 6.10701C17.8901 6.67413 18.1426 7.37911 18.1426 8.14307L18.1426 12.8543C18.1426 13.5206 18.1426 13.8538 18.1036 14.1332C17.8526 15.936 16.4355 17.3531 14.6327 17.6042C14.3533 17.6431 14.0201 17.6431 13.3538 17.6431L9.09357 17.6431C8.21621 17.6431 7.4075 17.3491 6.76056 16.8543"
                                stroke="#99A2AF"
                                strokeWidth="1.49286"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_943_164230">
                                <rect width="19" height="19" fill="white" transform="translate(19.5 19) rotate(180)" />
                              </clipPath>
                            </defs>
                          </svg>
                          <h3 className="typography-p4-strong text-[#24292F]">Refine</h3>
                        </div>
                        <div className="typography-p5-medium max-w-[280px] text-left text-[#57606A]">
                          Use Attio’s intuitive UI and ultra-customizable building blocks to craft your ideal workflows.
                        </div>
                      </div>
                      <div className="mx-auto flex w-[495px] justify-center overflow-hidden">
                        <div className="self-center mx-auto">
                          <div className="relative isolate">
                            <picture className="absolute inset-0 z-10 h-full w-full opacity-0">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-refine-QIDSIUNL.webp" media="(max-width:991px)" type="image/webp" />
                              <img
                                loading="lazy"
                                srcSet="/mockup-refine-QIDSIUNL.webp"
                                className=""
                                alt="A popup allows creating a new attribute in a list, choosing from a list of name, email address, Instagram and others."
                              />
                            </picture>
                            <picture className="relative inset-0 z-0 h-full w-full">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-refine-QIDSIUNL.webp" type="image/webp" media="(max-width:991px)" />
                              <img loading="lazy" srcSet="/mockup-refine-QIDSIUNL.webp" className="" alt="" />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-[20px] flex w-[75vw] max-w-[495px] flex-shrink-0 snap-center flex-col justify-between gap-[24px] rounded-12px pt-24px transition duration-200 card-light-shadow bg-background-light-primary">
                      <div className="flex flex-col gap-8px px-24px">
                        <div className="flex flex-row items-center gap-8px">
                          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M6.34197 17.1338C6.34197 14.2261 7.90938 11.6058 10.817 11.6058C7.90938 11.6058 6.34197 8.98541 6.34197 6.07776C6.34197 8.98541 4.77457 11.6058 1.86691 11.6058C4.77457 11.6058 6.34197 14.2261 6.34197 17.1338Z"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.7127 8.71014C13.7127 6.96555 15.3902 5.28804 17.1348 5.28804C15.3902 5.28804 13.7127 3.61053 13.7127 1.86593C13.7127 3.61053 12.0351 5.28804 10.2906 5.28804C12.0351 5.28804 13.7127 6.96555 13.7127 8.71014Z"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <h3 className="typography-p4-strong text-[#24292F]">Work</h3>
                        </div>
                        <div className="typography-p5-medium max-w-[280px] text-left text-[#57606A]">
                          Grow your business at scale with enriched data, custom attributes, and powerful integrations.
                        </div>
                      </div>
                      <div className="mx-auto flex w-[495px] justify-center overflow-hidden">
                        <div className="self-center mx-auto">
                          <div className="relative isolate">
                            <picture className="absolute inset-0 z-10 h-full w-full opacity-0">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-work-HQEVF3XL.webp" media="(max-width:991px)" type="image/webp" />
                              <img
                                loading="lazy"
                                srcSet="/mockup-work-HQEVF3XL.webp"
                                className=""
                                alt="A card labelled Stripe is moved from a Screening column to the next column along in a Pipeline view."
                              />
                            </picture>
                            <picture className="relative inset-0 z-0 h-full w-full">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-work-HQEVF3XL.webp" type="image/webp" media="(max-width:991px)" />
                              <img loading="lazy" srcSet="/mockup-work-HQEVF3XL.webp" className="" alt="" />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="overflow-hidden rounded-[20px] flex w-[75vw] max-w-[495px] flex-shrink-0 snap-center flex-col justify-between gap-[24px] rounded-12px pt-24px transition duration-200 card-light-shadow bg-background-light-primary">
                      <div className="flex flex-col gap-8px px-24px">
                        <div className="flex flex-row items-center gap-8px">
                          <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect
                              x="2.53516"
                              y="2.03516"
                              width="14.9286"
                              height="14.9286"
                              rx="3.39286"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.55469 7.20264L6.55469 12.9444"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M10 6.05469V12.9448"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M13.4434 9.49951V12.9446"
                              stroke="#99A2AF"
                              strokeWidth="1.49286"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <h3 className="typography-p4-strong text-[#24292F]">Report</h3>
                        </div>
                        <div className="typography-p5-medium max-w-[280px] text-left text-[#57606A]">
                          Analyze, track and share reports built on real-time data from across your workspace.
                        </div>
                      </div>
                      <div className="mx-auto flex w-[495px] justify-center overflow-hidden">
                        <div className="self-center mx-auto">
                          <div className="relative isolate">
                            <picture className="absolute inset-0 z-10 h-full w-full opacity-0">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-report-JAXR6WI3.webp" media="(max-width:991px)" type="image/webp" />
                              <img
                                loading="lazy"
                                srcSet="/mockup-report-JAXR6WI3.webp"
                                className=""
                                alt="A card labelled Stripe is moved from a Screening column to the next column along in a Pipeline view."
                              />
                            </picture>
                            <picture className="relative inset-0 z-0 h-full w-full">
                              <source srcSet="" media="(min-width:992px)" />
                              <source srcSet="/mockup-report-JAXR6WI3.webp" type="image/webp" media="(max-width:991px)" />
                              <img loading="lazy" srcSet="/mockup-report-JAXR6WI3.webp" className="" alt="" />
                            </picture>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-center pb-24px pt-[22px] tablet:hidden">
                    <div className="flex flex-row gap-8px ">
                      <div className="h-4px w-[22px] rounded-2px bg-[#99A2AF]" />
                      <div className="h-4px w-[22px] rounded-2px bg-[#E4E7EB]" />
                      <div className="h-4px w-[22px] rounded-2px bg-[#E4E7EB]" />
                      <div className="h-4px w-[22px] rounded-2px bg-[#E4E7EB]" />
                    </div>
                  </div>
                </div>
                <div className="h-[420px]" />
              </div>
              <div className="py-[40px]tablet:px-0 tablet:pb-[160px] tablet:pt-[60px]">
                <div className="mx-auto flex max-w-[541px] flex-col tablet:items-center desktop:max-w-[606px]">
                  <img className="h-[44px] w-[44px] rounded-full" src="/Adolfo_Avila.jpg" alt="DeGrasse Schrader" />
                  <p className="text-lg font-light tablet:text-xl tablet:font-light mt-[24px] tablet:text-center tablet:!leading-140">
                    “Taskility es una herramienta poderosa y flexible. Es muy fácil de usar y adaptar a los diferentes tipos de embarques que tienen nuestros clientes.”
                  </p>
                  <div className="mt-[24px]">
                    <div className="typography-p6-medium tablet:text-center">
                      <p className="text-sm font-normal text-tkyGrey-dark">Mario A.</p>
                      <p className="mt-[2px] text-sm font-normal text-tkyGrey">Control Rentabilidad, CAMEXt</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}