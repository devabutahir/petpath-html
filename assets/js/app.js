// preloader
// toggle mobile menu
// mobile menu functions
// accordion item
// Show current year on footer
// back to top

"use strict"

// preloader
setTimeout(() => {
    if (document.querySelector(".preloader")) {
        document.querySelector(".preloader").style.display = "none"
    }
}, 1000);

document.addEventListener('DOMContentLoaded', () => {

    // scroll header 
    const header = document.querySelector('header');
    if (header) {
        const headerHeight = header.offsetHeight;
        window.onscroll = function () {
            let scrollPosition = window.pageYOffset;
            if (scrollPosition > headerHeight) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
    }

    // menu active class
    const navLinks = document.querySelectorAll('.menu-link a');
    const currentUrl = window.location.href.split(/[?#]/)[0];
    if (navLinks) {
        navLinks.forEach(link => {
            if (link.href === currentUrl) {
                link.classList.add('active');
                // Add active class to the parent menu-item if it exists
                let parentMenuItem = link.closest('.menu-item');
                if (parentMenuItem) {
                    parentMenuItem.classList.add('active');
                    if (parentMenuItem.parentElement.closest(".menu-item")) {
                        parentMenuItem.parentElement.closest(".menu-item").classList.add('active')
                    }
                }
            }
        });
    }

    // toggle mobile menu
    const menuToggleBtn = document.querySelector(".menu-toggle-btn");
    const navbarArea = document.querySelector(".navbar-area");
    if (menuToggleBtn && navbarArea) {
        menuToggleBtn.addEventListener("click", function () {
            navbarArea.classList.toggle("open");
        });
    }
    // outside click
    if (menuToggleBtn && navbarArea) {
        document.addEventListener("click", function (event) {
            if (!menuToggleBtn.contains(event.target) && !navbarArea.contains(event.target)) {
                navbarArea.classList.remove("open");
            }
        });
    }

    // mobile menu functions
    const mobileMenu = () => {
        if (window.matchMedia("(max-width: 991px)").matches) {
            const menuLinks = document.querySelectorAll(".menu-item button");
            menuLinks.forEach(function (link) {
                const subMenu = link.parentElement.querySelector(".sub-menu");
                animatedHeight(link, subMenu);

                if (subMenu) {
                    const subMenuItems = subMenu.querySelectorAll(".menu-item button");
                    subMenuItems.forEach(item => {
                        const subSubMenu = item.querySelector(".sub-menu");
                        animatedHeight(item, subSubMenu);
                    })
                }
            });
        }
    }

    mobileMenu();

    window.addEventListener("resize", function () {
        mobileMenu();
    })

    // search form
    const searchBtn = document.querySelector(".search-btn");
    const searchForm = document.querySelector(".search-form-wrapper");
    const searchCloseBtn = document.querySelector(".search-close-btn");
    if (searchBtn && searchForm) {
        searchBtn.addEventListener("click", function () {
            searchForm.classList.toggle("active");
        });
        searchCloseBtn.addEventListener("click", function () {
            searchForm.classList.remove("active");
        });
    }


    // Box Style 
    const targetBtn = document.querySelectorAll('.box-style')
    if (targetBtn) {
        targetBtn.forEach((element) => {
            element.addEventListener('mousemove', (e) => {
                const x = e.offsetX + 'px';
                const y = e.offsetY + 'px';
                element.style.setProperty('--x', x);
                element.style.setProperty('--y', y);
            })
        })
    }

    // accordion item
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        const accordionItem = header.parentNode;
        const accordionContent = accordionItem.querySelector('.accordion-content');

        // Set initial maxHeight to 0 if not open, otherwise set it to its full height
        if (!accordionItem.classList.contains('show')) {
            accordionContent.style.maxHeight = '0';
        } else {
            accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
        }

        header.addEventListener('click', () => {
            const isOpen = accordionItem.classList.contains('show');

            if (isOpen) {
                // Collapse the accordion item
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';

                requestAnimationFrame(() => {
                    accordionContent.style.maxHeight = '0';
                });
            } else {
                // Expand the accordion item
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            }

            accordionItem.classList.toggle('show');

            // Optionally, collapse other accordion sections
            const otherContents = document.querySelectorAll('.accordion-item');
            otherContents.forEach(content => {
                if (content !== accordionItem) {
                    content.classList.remove('show');
                    content.querySelector('.accordion-content').style.maxHeight = '0';
                }
            });
        });
    });



    // // progress bar
    // const progressBarWraps = document.querySelectorAll('.progress-bar-wrap');
    // const updateProgressBar = (progressBarWrap) => {
    //     const progressValueElement = progressBarWrap.querySelector('.progress-bar-inner').getAttribute('data-value');
    //     // console.log(progressValueElement);
    //     const numericValue = parseInt(progressValueElement.replace('%', ''), 10);

    //     const progressBarInner = progressBarWrap.querySelector('.progress-bar-inner');
    //     progressBarInner.style.width = numericValue + '%';
    // };
    // const ProgressObserver = new IntersectionObserver((entries, observer) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting) {
    //             updateProgressBar(entry.target);
    //             observer.unobserve(entry.target); // Stop observing once the animation is done
    //         }
    //     });
    // }, {
    //     threshold: 0.1 // Trigger when 10% of the element is visible
    // });
    // progressBarWraps.forEach(progressBarWrap => {
    //     ProgressObserver.observe(progressBarWrap);
    // });

    // // team social list active
    // const socialLists = document.querySelectorAll('.social-link-wrapper');
    // if (socialLists) {
    //     socialLists.forEach(socialList => {
    //         const socialBtn = socialList.querySelector(".social-btn");
    //         const socialItem = socialList.querySelector(".social-items");
    //         const icon = socialBtn.querySelector('i')

    //         socialBtn.addEventListener("click", function () {
    //             socialItem.classList.toggle("active");
    //             if (icon.classList.contains('ph-plus')) {
    //                 icon.classList.remove('ph-plus')
    //                 icon.classList.add('ph-minus')
    //             } else {
    //                 icon.classList.remove('ph-minus')
    //                 icon.classList.add('ph-plus')
    //             }
    //         })
    //     });
    // }

    // // radio focused
    // document.querySelectorAll('.package-input .input-radiobox').forEach(input => {
    //     input.addEventListener('click', function () {
    //         // Remove the 'focused' class from all .package-input elements
    //         document.querySelectorAll('.package-input').forEach(packageInput => {
    //             packageInput.classList.remove('focused');
    //         });

    //         // Add the 'focused' class to the closest .package-input of the clicked item
    //         this.closest('.package-input').classList.add('focused');
    //     });
    // });

    // // credit card form select
    // const creditCardForm = document.querySelector('.credit-card-form');
    // const creditCardInput = document.querySelector('.creditCardInput');
    // if (creditCardForm && creditCardInput) {
    //     if (creditCardInput.checked) {
    //         creditCardForm.classList.add('active');
    //     } else {
    //         creditCardForm.classList.remove('active');
    //     }
    //     document.addEventListener("click", function () {
    //         if (creditCardInput.checked) {
    //             creditCardForm.classList.add('active');
    //         } else {
    //             creditCardForm.classList.remove('active');
    //         }
    //     })
    // }

    // Show current year on footer
    const yearEl = document.querySelector(".currentYear");
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }

    // back to top
    const backToTop = document.querySelector(".back-to-top")
    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (this.window.scrollY > 200) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        })

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })
    }

    // share options
    // const shareButton = document.getElementById('shareButton');
    // const shareOptions = document.getElementById('shareOptions');

    // if (shareButton && shareOptions) {
    //     function positionShareOptions() {
    //         const buttonRect = shareButton.getBoundingClientRect();
    //         const windowHeight = window.innerHeight;
    //         const optionsHeight = shareOptions.offsetHeight;

    //         if (buttonRect.bottom + optionsHeight > windowHeight) {
    //             shareOptions.classList.remove('below');
    //         } else {
    //             shareOptions.classList.add('below');
    //         }
    //     }

    //     shareButton.addEventListener('click', function () {
    //         shareOptions.classList.toggle('show-share-options');
    //         positionShareOptions();
    //     });

    //     const shareLinks = document.querySelectorAll('.share-option');
    //     shareLinks.forEach(link => {
    //         link.addEventListener('click', function (e) {
    //             e.preventDefault();
    //             const platform = this.getAttribute('data-platform');
    //             const url = encodeURIComponent(window.location.href);
    //             const text = encodeURIComponent('Check out this awesome post!');
    //             const title = encodeURIComponent(document.title);

    //             let shareUrl;
    //             switch (platform) {
    //                 case 'facebook':
    //                     shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    //                     break;
    //                 case 'twitter':
    //                     shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
    //                     break;
    //                 case 'linkedin':
    //                     shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`;
    //                     break;
    //                 case 'pinterest':
    //                     shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
    //                     break;
    //                 case 'reddit':
    //                     shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
    //                     break;
    //                 case 'whatsapp':
    //                     shareUrl = `https://wa.me/?text=${text} ${url}`;
    //                     break;
    //                 case 'telegram':
    //                     shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
    //                     break;
    //                 case 'tumblr':
    //                     shareUrl = `https://www.tumblr.com/share/link?url=${url}&name=${title}&description=${text}`;
    //                     break;
    //                 case 'email':
    //                     shareUrl = `mailto:?subject=${title}&body=${text} ${url}`;
    //                     break;
    //             }

    //             if (shareUrl) {
    //                 window.open(shareUrl, '_blank');
    //             }
    //         });
    //     });

    //     document.addEventListener("click", function (event) {
    //         if (!shareButton.contains(event.target) && !shareOptions.contains(event.target)) {
    //             shareOptions.classList.remove("show-share-options");
    //         }
    //     });

    //     window.addEventListener("resize", function () {
    //         positionShareOptions();
    //     });
    // }

    const shareButton = document.getElementById('shareButton');
    const shareOptions = document.getElementById('shareOptions');
    const copyLink = document.getElementById('copyLink');

    if (shareButton && shareOptions) {
        function positionShareOptions() {
            const buttonRect = shareButton.getBoundingClientRect();
            const windowWidth = window.innerWidth;
            const optionsWidth = shareOptions.offsetWidth;
            const windowHeight = window.innerHeight;
            const optionsHeight = shareOptions.offsetHeight;

            // Vertical positioning (above or below)
            if (buttonRect.bottom + optionsHeight > windowHeight) {
                shareOptions.classList.remove('below');
            } else {
                shareOptions.classList.add('below');
            }

            // Horizontal positioning (left or right)
            if (buttonRect.right + optionsWidth > windowWidth) {
                shareOptions.classList.add('left');
            } else {
                shareOptions.classList.remove('left');
            }
        }

        shareButton.addEventListener('click', function () {
            shareOptions.classList.toggle('show-share-options');
            positionShareOptions();
        });

        // Add event listener to each share option
        const shareLinks = document.querySelectorAll('.share-option');
        shareLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                const url = encodeURIComponent(window.location.href);
                const text = encodeURIComponent('Check out this awesome post!');
                const title = encodeURIComponent(document.title);

                let shareUrl;
                switch (platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
                        break;
                    case 'linkedin':
                        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${text}`;
                        break;
                    case 'pinterest':
                        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}&description=${text}`;
                        break;
                    case 'reddit':
                        shareUrl = `https://reddit.com/submit?url=${url}&title=${title}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://wa.me/?text=${text} ${url}`;
                        break;
                    case 'telegram':
                        shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
                        break;
                    case 'tumblr':
                        shareUrl = `https://www.tumblr.com/share/link?url=${url}&name=${title}&description=${text}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${title}&body=${text} ${url}`;
                        break;
                }

                if (shareUrl) {
                    window.open(shareUrl, '_blank');
                }
            });
        });

        copyLink.addEventListener('click', function (e) {
            e.preventDefault();
            const url = window.location.href;

            navigator.clipboard.writeText(url).then(() => {
                /* eslint-disable */console.log(...oo_oo(`3408575038_429_16_429_56_4`,'Link copied to clipboard!'));
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });

            shareOptions.classList.remove("show-share-options"); // Hide the share options after copying
        });

        // Remove share options when clicked outside
        document.addEventListener("click", function (event) {
            if (!shareButton.contains(event.target) && !shareOptions.contains(event.target)) {
                shareOptions.classList.remove("show-share-options");
            }
        });

        window.addEventListener("resize", function () {
            positionShareOptions();
        });
    }




    // comment reply form toggle
    const commentReplayBtn = document.querySelectorAll(".comment-replay-btn");
    if (commentReplayBtn) {
        commentReplayBtn.forEach(btn => {
            btn.addEventListener("click", function () {
                const singleCommentParent = this.closest('.single-comment');
                const commentReplayForm = singleCommentParent.querySelector('.comment-replay-form');
                commentReplayForm.classList.add("active");
            });
        })
    }

    // range slider
    const minInput = document.querySelector('.min');
    const maxInput = document.querySelector('.max');
    const minLabel = document.querySelector('.min-label');
    const maxLabel = document.querySelector('.max-label');
    const sliderRange = document.querySelector('.slider-range');

    function updateSlider() {
        let minVal = parseInt(minInput.value);
        let maxVal = parseInt(maxInput.value);

        if (minVal > maxVal) {
            if (this === minInput) {
                maxVal = minVal;
                maxInput.value = maxVal;
            } else {
                minVal = maxVal;
                minInput.value = minVal;
            }
        }

        minLabel.textContent = minVal;
        maxLabel.textContent = maxVal;

        const minPercent = ((minVal - minInput.min) / (minInput.max - minInput.min)) * 100;
        const maxPercent = ((maxVal - minInput.min) / (minInput.max - minInput.min)) * 100;

        sliderRange.style.left = `${minPercent}%`;
        sliderRange.style.width = `${maxPercent - minPercent}%`;
    }
    if (minInput && maxInput) {
        minInput.addEventListener('input', updateSlider);
        maxInput.addEventListener('input', updateSlider);

        updateSlider(); // Initial call to set up the slider
    }

    // shop sidebar
    const shopSidebar = document.querySelector(".shop-sidebar");
    const shopSidebarBtn = document.querySelector(".shop-sidebar-btn");
    if (shopSidebarBtn && shopSidebar) {
        shopSidebarBtn.addEventListener("click", function () {
            shopSidebar.classList.toggle("active");
        })
    }
    // out side click
    document.addEventListener("click", function (event) {
        if (shopSidebar && shopSidebarBtn) {
            if (!shopSidebar.contains(event.target) && !shopSidebarBtn.contains(event.target)) {
                shopSidebar.classList.remove("active");
            }
        }
    });


    // quntity increment and decrement
    const quantityIncrement = document.querySelectorAll(".quantityIncrement")
    const quantityDecrement = document.querySelectorAll(".quantityDecrement")
    if (quantityIncrement && quantityDecrement) {
        quantityIncrement.forEach(increment => {
            increment.addEventListener("click", function () {
                const value = parseInt(increment.parentElement.querySelector("input").value)
                increment.parentElement.querySelector("input").value = value + 1
            })
        })

        quantityDecrement.forEach(decrement => {
            decrement.addEventListener("click", function () {
                const value = parseInt(decrement.parentElement.querySelector("input").value)
                if (value > 1) {
                    decrement.parentElement.querySelector("input").value = value - 1
                }
            })
        })
    }

    // image zoomer
    let imageZoomer = (zoomableContainers, minScale = 2, maxScale = 5) => {
        // selector, minScale, maxScale
        // Loop through each zoomable image container
        zoomableContainers.forEach(container => {
            const image = container.querySelector('img');
            const productImageSrc = image.src; // Use the source of the image inside the container

            // Create zoomed image container dynamically
            const zoomedImageContainer = document.createElement('div');
            zoomedImageContainer.classList.add('zoomed-image-container');
            container.appendChild(zoomedImageContainer);

            // Create zoomed image element
            const zoomedImage = document.createElement('img');
            zoomedImage.src = productImageSrc;
            zoomedImage.classList.add('zoomed-image');
            zoomedImageContainer.appendChild(zoomedImage);

            container.addEventListener('mousemove', (e) => {
                const { offsetX, offsetY } = e;
                const { width, height } = container.getBoundingClientRect();
                const x = (offsetX / width) * 100;
                const y = (offsetY / height) * 100;

                zoomedImage.style.transformOrigin = `${x}% ${y}%`;
                zoomedImage.style.transform = `scale(${minScale})`;
            });

            container.addEventListener('mouseleave', () => {
                zoomedImage.style.transformOrigin = 'center center'; // Reset transform origin
                zoomedImage.style.transform = `scale(${minScale})`;
            });

            container.addEventListener('wheel', (e) => {
                e.preventDefault(); // Prevent page scrolling
                const zoomAmount = 0.1;
                if (e.deltaY < 0 && minScale < maxScale) {
                    // Zoom in
                    minScale += zoomAmount;
                } else {
                    // Zoom out
                    minScale = Math.max(2, minScale - zoomAmount); // Ensure minimum scale is 2
                }
                zoomedImage.style.transform = `scale(${minScale})`;
            });
        });
    }
    const zoomableContainers = document.querySelectorAll('.zoomable-image-container')
    imageZoomer(zoomableContainers, 2, 5);


    // tab function
    const tabButtons = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");
    if (tabButtons && tabContents) {
        tabButtons.forEach(button => {
            button.addEventListener("click", () => {
                const tabNumber = button.getAttribute("data-tab");
                tabButtons.forEach(btn => btn.classList.remove("active"));
                button.classList.add("active");
                tabContents.forEach(content => content.classList.remove("active"));
                document.querySelector(`.tab-content[data-tab="${tabNumber}"]`).classList.add("active");
            });
        });
    }

    // // animated height
    // function animatedHeight(button, animatedItem) {
    //     if (!button || !animatedItem) {
    //         return;
    //     }
    //     button.addEventListener("click", function () {

    //         if (animatedItem.classList.contains("active")) {
    //             // If active, collapse the animatedItem
    //             animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Set to current height

    //             requestAnimationFrame(() => {
    //                 animatedItem.style.maxHeight = '0'; // Collapse to height 0
    //             });
    //         } else {
    //             // If not active, expand the animatedItem
    //             animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Expand to its full height
    //         }

    //         animatedItem.classList.toggle("active");
    //         // Clean up after the transition
    //         animatedItem.addEventListener('transitionend', function () {
    //             if (!animatedItem.classList.contains("active")) {
    //                 animatedItem.style.maxHeight = ''; // Remove the height when collapsed
    //             } else {
    //                 animatedItem.style.maxHeight = 'none'; // Keep it open at full height
    //             }
    //         }, { once: true });
    //     })

    // }

    // const couponToggleBtn = document.querySelector(".coupon-toggle-btn");
    // const couponForm = document.querySelector(".coupon-form");
    // animatedHeight(couponToggleBtn, couponForm);


    function animatedHeight(button, animatedItem) {
        if (!button || !animatedItem) {
            return;
        }

        // Initial styles for the animated item
        animatedItem.style.maxHeight = '0';
        animatedItem.style.opacity = '0';
        animatedItem.style.overflow = 'hidden';
        animatedItem.style.transition = 'max-height 0.5s ease-in-out, opacity 0.5s ease-in-out';

        button.addEventListener("click", function () {
            if (animatedItem.classList.contains("active")) {
                // If active, collapse the animatedItem
                animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Set to current height

                requestAnimationFrame(() => {
                    animatedItem.style.maxHeight = '0'; // Collapse to height 0
                });
            } else {
                // If not active, expand the animatedItem
                animatedItem.style.maxHeight = animatedItem.scrollHeight + 'px'; // Expand to its full height
            }

            animatedItem.classList.toggle("active");

            if (animatedItem.classList.contains("active")) {
                animatedItem.style.opacity = '1'; // Fade in
            } else {
                animatedItem.style.opacity = '0'; // Fade out
            }

            // Clean up after the transition
            animatedItem.addEventListener('transitionend', function () {
                if (!animatedItem.classList.contains("active")) {
                    animatedItem.style.maxHeight = '0'; // Remove the height when collapsed
                } else {
                    animatedItem.style.maxHeight = 'none'; // Keep it open at full height
                }
            }, { once: true });
        });
    }

    const couponToggleBtn = document.querySelector(".coupon-toggle-btn");
    const couponForm = document.querySelector(".coupon-form");
    animatedHeight(couponToggleBtn, couponForm);







});
/* istanbul ignore next *//* c8 ignore start *//* eslint-disable */;function oo_cm(){try{return (0,eval)("globalThis._console_ninja") || (0,eval)("/* https://github.com/wallabyjs/console-ninja#how-does-it-work */'use strict';var _0x277122=_0xc5ab;function _0x16b5(){var _0xa1823c=['_hasSetOnItsPath','_connecting','autoExpandLimit','sortProps','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host','_treeNodePropertiesBeforeFullValue','getPrototypeOf','replace','pathToFileURL','unshift','date','_additionalMetadata','default','stringify','process','setter','_isSet','now','[object\\x20Set]','autoExpandPropertyCount','elements','stackTraceLimit','18372740bHyhYr','toLowerCase','_setNodeLabel','_dateToString','edge','_propertyName','63361icYNzh','array','_connected','index','Number','concat','expId','WebSocket','getOwnPropertyDescriptor','_numberRegExp','current','negativeInfinity','match','next.js','map','HTMLAllCollection','_getOwnPropertyDescriptor','toString',[\"localhost\",\"127.0.0.1\",\"example.cypress.io\",\"Pixner\",\"192.168.0.98\"],'parse','autoExpand','props','webpack','positiveInfinity','join','disabledLog','%c\\x20Console\\x20Ninja\\x20extension\\x20is\\x20connected\\x20to\\x20','Buffer','_socket','name','null','_setNodeExpandableState','method','root_exp','11105','[object\\x20BigInt]','undefined','nodeModules','_sendErrorMessage','depth','global','_addProperty','defineProperty','nan','_blacklistedProperty','\\x20browser','3606463hpwOgk','test','_allowedToSend','send','some','object','see\\x20https://tinyurl.com/2vt8jxzw\\x20for\\x20more\\x20info.','_HTMLAllCollection','unknown','split','indexOf','Map','_getOwnPropertyNames','_setNodePermissions','1725540476201','_isMap','_isUndefined','Symbol','_property','RegExp','astro','_ws','3123JAjneK','get','totalStrLength','[object\\x20Map]','_connectAttemptCount','host','[object\\x20Array]','Boolean','_getOwnPropertySymbols','sort','root_exp_id','unref','reload','','3ABiXMk','\\x20server','error','gateway.docker.internal','bigint','_console_ninja','negativeZero','getOwnPropertySymbols','cappedProps','string','hostname','_objectToString','_setNodeExpressionPath','resolveGetters','_setNodeId','_reconnectTimeout','Set','console','onmessage','endsWith','_Symbol','_undefined','_inBrowser','timeStamp','127.0.0.1','getOwnPropertyNames','_addFunctionsNode','elapsed','enumerable','isExpressionToEvaluate','node','function','logger\\x20failed\\x20to\\x20connect\\x20to\\x20host,\\x20see\\x20','data','https://tinyurl.com/37x8b79t','_allowedToConnectOnSend','_addObjectProperty','noFunctions','startsWith','_isNegativeZero','reduceLimits','3574804wGdXXu','bind','log','substr','_isPrimitiveWrapperType','_isPrimitiveType','create','_treeNodePropertiesAfterFullValue','_connectToHostNow','_keyStrRegExp','1.0.0','performance','getWebSocketClass','message','prototype','constructor','38408OqGOST','then','ws://','18FXuSSO','stack','port','angular','_consoleNinjaAllowedToStart','5141040bNQfuK','number','','_console_ninja_session','warn','boolean','location','_isArray','allStrLength','_attemptToReconnectShortly','slice','versions','origin','perf_hooks','strLength','length','_p_name','onopen','eventReceivedCallback','autoExpandMaxDepth','_regExpToString','count','getter','set','String','capped','forEach','hasOwnProperty','ws/index.js','path','parent','_processTreeNodeResult','dockerizedApp','_p_','NEGATIVE_INFINITY','logger\\x20websocket\\x20error','1','charAt','...','trace','_maxConnectAttemptCount','value','onerror','args','_hasSymbolPropertyOnItsPath','_inNextEdge','hits','_WebSocketClass','_capIfString','_sortProps','time','onclose','failed\\x20to\\x20find\\x20and\\x20load\\x20WebSocket','level','_webSocketErrorDocsLink',\"c:\\\\Users\\\\User\\\\.vscode\\\\extensions\\\\wallabyjs.console-ninja-1.0.357\\\\node_modules\",'pop','env','valueOf','fromCharCode','_setNodeQueryPath','type','cappedElements','symbol','push','call','rootExpression','close','6452480sIuOir','hrtime','expressionsToEvaluate','serialize','readyState','Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20restarting\\x20the\\x20process\\x20may\\x20help;\\x20also\\x20see\\x20','autoExpandPreviousObjects','toUpperCase','_disposeWebsocket','_WebSocket','__es'+'Module','catch','_cleanNode','_type','NEXT_RUNTIME'];_0x16b5=function(){return _0xa1823c;};return _0x16b5();}(function(_0x3042d2,_0x53ea59){var _0x46f915=_0xc5ab,_0x23aa03=_0x3042d2();while(!![]){try{var _0x5b63f1=parseInt(_0x46f915(0x182))/0x1+parseInt(_0x46f915(0x1fd))/0x2*(parseInt(_0x46f915(0x1d4))/0x3)+-parseInt(_0x46f915(0x215))/0x4+-parseInt(_0x46f915(0x157))/0x5+-parseInt(_0x46f915(0x210))/0x6*(-parseInt(_0x46f915(0x1b0))/0x7)+-parseInt(_0x46f915(0x20d))/0x8*(parseInt(_0x46f915(0x1c6))/0x9)+parseInt(_0x46f915(0x17c))/0xa;if(_0x5b63f1===_0x53ea59)break;else _0x23aa03['push'](_0x23aa03['shift']());}catch(_0xcd60bd){_0x23aa03['push'](_0x23aa03['shift']());}}}(_0x16b5,0xf22d9));var K=Object[_0x277122(0x203)],Q=Object[_0x277122(0x1ac)],G=Object[_0x277122(0x18a)],ee=Object[_0x277122(0x1ed)],te=Object[_0x277122(0x16c)],ne=Object[_0x277122(0x20b)][_0x277122(0x12e)],re=(_0x371906,_0x55a3e2,_0x3af47c,_0x165ef5)=>{var _0x575e23=_0x277122;if(_0x55a3e2&&typeof _0x55a3e2==_0x575e23(0x1b5)||typeof _0x55a3e2=='function'){for(let _0x27bee9 of ee(_0x55a3e2))!ne[_0x575e23(0x154)](_0x371906,_0x27bee9)&&_0x27bee9!==_0x3af47c&&Q(_0x371906,_0x27bee9,{'get':()=>_0x55a3e2[_0x27bee9],'enumerable':!(_0x165ef5=G(_0x55a3e2,_0x27bee9))||_0x165ef5[_0x575e23(0x1f0)]});}return _0x371906;},V=(_0x169a06,_0x165248,_0x5c1060)=>(_0x5c1060=_0x169a06!=null?K(te(_0x169a06)):{},re(_0x165248||!_0x169a06||!_0x169a06[_0x277122(0x161)]?Q(_0x5c1060,_0x277122(0x172),{'value':_0x169a06,'enumerable':!0x0}):_0x5c1060,_0x169a06)),x=class{constructor(_0xba3f07,_0xbb405a,_0x4c765b,_0x167a4f,_0x38af46,_0x2c79b5){var _0x3fa3fb=_0x277122,_0x8aa9f5,_0x290311,_0x176214,_0xf92787;this[_0x3fa3fb(0x1aa)]=_0xba3f07,this[_0x3fa3fb(0x1cb)]=_0xbb405a,this[_0x3fa3fb(0x212)]=_0x4c765b,this[_0x3fa3fb(0x1a7)]=_0x167a4f,this[_0x3fa3fb(0x133)]=_0x38af46,this[_0x3fa3fb(0x125)]=_0x2c79b5,this[_0x3fa3fb(0x1b2)]=!0x0,this['_allowedToConnectOnSend']=!0x0,this[_0x3fa3fb(0x184)]=!0x1,this[_0x3fa3fb(0x167)]=!0x1,this['_inNextEdge']=((_0x290311=(_0x8aa9f5=_0xba3f07['process'])==null?void 0x0:_0x8aa9f5[_0x3fa3fb(0x14c)])==null?void 0x0:_0x290311[_0x3fa3fb(0x165)])===_0x3fa3fb(0x180),this[_0x3fa3fb(0x1ea)]=!((_0xf92787=(_0x176214=this[_0x3fa3fb(0x1aa)][_0x3fa3fb(0x174)])==null?void 0x0:_0x176214[_0x3fa3fb(0x220)])!=null&&_0xf92787[_0x3fa3fb(0x1f2)])&&!this[_0x3fa3fb(0x140)],this[_0x3fa3fb(0x142)]=null,this[_0x3fa3fb(0x1ca)]=0x0,this[_0x3fa3fb(0x13b)]=0x14,this[_0x3fa3fb(0x149)]=_0x3fa3fb(0x1f6),this['_sendErrorMessage']=(this[_0x3fa3fb(0x1ea)]?'Console\\x20Ninja\\x20failed\\x20to\\x20send\\x20logs,\\x20refreshing\\x20the\\x20page\\x20may\\x20help;\\x20also\\x20see\\x20':_0x3fa3fb(0x15c))+this[_0x3fa3fb(0x149)];}async['getWebSocketClass'](){var _0x166d81=_0x277122,_0x4a3567,_0x31201e;if(this['_WebSocketClass'])return this[_0x166d81(0x142)];let _0x15eef9;if(this[_0x166d81(0x1ea)]||this[_0x166d81(0x140)])_0x15eef9=this['global'][_0x166d81(0x189)];else{if((_0x4a3567=this[_0x166d81(0x1aa)][_0x166d81(0x174)])!=null&&_0x4a3567[_0x166d81(0x160)])_0x15eef9=(_0x31201e=this[_0x166d81(0x1aa)][_0x166d81(0x174)])==null?void 0x0:_0x31201e[_0x166d81(0x160)];else try{let _0x4e48a3=await import(_0x166d81(0x130));_0x15eef9=(await import((await import('url'))[_0x166d81(0x16e)](_0x4e48a3[_0x166d81(0x19a)](this['nodeModules'],_0x166d81(0x12f)))['toString']()))[_0x166d81(0x172)];}catch{try{_0x15eef9=require(require(_0x166d81(0x130))[_0x166d81(0x19a)](this[_0x166d81(0x1a7)],'ws'));}catch{throw new Error(_0x166d81(0x147));}}}return this[_0x166d81(0x142)]=_0x15eef9,_0x15eef9;}[_0x277122(0x205)](){var _0x51dc96=_0x277122;this['_connecting']||this['_connected']||this['_connectAttemptCount']>=this[_0x51dc96(0x13b)]||(this[_0x51dc96(0x1f7)]=!0x1,this[_0x51dc96(0x167)]=!0x0,this[_0x51dc96(0x1ca)]++,this[_0x51dc96(0x1c5)]=new Promise((_0x58c90f,_0x112630)=>{var _0x4c12d5=_0x51dc96;this[_0x4c12d5(0x209)]()[_0x4c12d5(0x20e)](_0x40518d=>{var _0x1b75d4=_0x4c12d5;let _0x49f47e=new _0x40518d(_0x1b75d4(0x20f)+(!this[_0x1b75d4(0x1ea)]&&this[_0x1b75d4(0x133)]?_0x1b75d4(0x1d7):this[_0x1b75d4(0x1cb)])+':'+this[_0x1b75d4(0x212)]);_0x49f47e[_0x1b75d4(0x13d)]=()=>{var _0x4ba6ce=_0x1b75d4;this[_0x4ba6ce(0x1b2)]=!0x1,this[_0x4ba6ce(0x15f)](_0x49f47e),this[_0x4ba6ce(0x21e)](),_0x112630(new Error(_0x4ba6ce(0x136)));},_0x49f47e[_0x1b75d4(0x124)]=()=>{var _0x8fc509=_0x1b75d4;this[_0x8fc509(0x1ea)]||_0x49f47e['_socket']&&_0x49f47e[_0x8fc509(0x19e)][_0x8fc509(0x1d1)]&&_0x49f47e[_0x8fc509(0x19e)][_0x8fc509(0x1d1)](),_0x58c90f(_0x49f47e);},_0x49f47e['onclose']=()=>{var _0x163a4c=_0x1b75d4;this[_0x163a4c(0x1f7)]=!0x0,this[_0x163a4c(0x15f)](_0x49f47e),this[_0x163a4c(0x21e)]();},_0x49f47e[_0x1b75d4(0x1e6)]=_0x36072=>{var _0x53acf1=_0x1b75d4;try{if(!(_0x36072!=null&&_0x36072[_0x53acf1(0x1f5)])||!this[_0x53acf1(0x125)])return;let _0x23adf4=JSON[_0x53acf1(0x195)](_0x36072['data']);this[_0x53acf1(0x125)](_0x23adf4[_0x53acf1(0x1a2)],_0x23adf4['args'],this[_0x53acf1(0x1aa)],this[_0x53acf1(0x1ea)]);}catch{}};})[_0x4c12d5(0x20e)](_0x261db6=>(this[_0x4c12d5(0x184)]=!0x0,this['_connecting']=!0x1,this['_allowedToConnectOnSend']=!0x1,this['_allowedToSend']=!0x0,this['_connectAttemptCount']=0x0,_0x261db6))[_0x4c12d5(0x162)](_0xd17c7c=>(this[_0x4c12d5(0x184)]=!0x1,this['_connecting']=!0x1,console['warn'](_0x4c12d5(0x1f4)+this[_0x4c12d5(0x149)]),_0x112630(new Error('failed\\x20to\\x20connect\\x20to\\x20host:\\x20'+(_0xd17c7c&&_0xd17c7c[_0x4c12d5(0x20a)])))));}));}[_0x277122(0x15f)](_0x2d53d4){var _0x112345=_0x277122;this[_0x112345(0x184)]=!0x1,this[_0x112345(0x167)]=!0x1;try{_0x2d53d4[_0x112345(0x146)]=null,_0x2d53d4[_0x112345(0x13d)]=null,_0x2d53d4[_0x112345(0x124)]=null;}catch{}try{_0x2d53d4[_0x112345(0x15b)]<0x2&&_0x2d53d4[_0x112345(0x156)]();}catch{}}['_attemptToReconnectShortly'](){var _0x5da88c=_0x277122;clearTimeout(this[_0x5da88c(0x1e3)]),!(this[_0x5da88c(0x1ca)]>=this[_0x5da88c(0x13b)])&&(this[_0x5da88c(0x1e3)]=setTimeout(()=>{var _0x3b3ae8=_0x5da88c,_0x36cd16;this[_0x3b3ae8(0x184)]||this[_0x3b3ae8(0x167)]||(this['_connectToHostNow'](),(_0x36cd16=this['_ws'])==null||_0x36cd16[_0x3b3ae8(0x162)](()=>this[_0x3b3ae8(0x21e)]()));},0x1f4),this[_0x5da88c(0x1e3)][_0x5da88c(0x1d1)]&&this['_reconnectTimeout'][_0x5da88c(0x1d1)]());}async[_0x277122(0x1b3)](_0x441b31){var _0x3de3cf=_0x277122;try{if(!this[_0x3de3cf(0x1b2)])return;this[_0x3de3cf(0x1f7)]&&this['_connectToHostNow'](),(await this[_0x3de3cf(0x1c5)])[_0x3de3cf(0x1b3)](JSON[_0x3de3cf(0x173)](_0x441b31));}catch(_0x5a238c){console[_0x3de3cf(0x219)](this[_0x3de3cf(0x1a8)]+':\\x20'+(_0x5a238c&&_0x5a238c[_0x3de3cf(0x20a)])),this[_0x3de3cf(0x1b2)]=!0x1,this[_0x3de3cf(0x21e)]();}}};function q(_0x436ba9,_0x141603,_0x5dc200,_0x26756b,_0x1ff14a,_0x6a31ab,_0x390747,_0x39e67e=ie){var _0x4f2c74=_0x277122;let _0x2776b7=_0x5dc200[_0x4f2c74(0x1b9)](',')[_0x4f2c74(0x190)](_0x4893f9=>{var _0x262543=_0x4f2c74,_0x5cc178,_0x5c0c95,_0x273a6c,_0x11f45d;try{if(!_0x436ba9[_0x262543(0x218)]){let _0x5497ef=((_0x5c0c95=(_0x5cc178=_0x436ba9[_0x262543(0x174)])==null?void 0x0:_0x5cc178[_0x262543(0x220)])==null?void 0x0:_0x5c0c95[_0x262543(0x1f2)])||((_0x11f45d=(_0x273a6c=_0x436ba9['process'])==null?void 0x0:_0x273a6c['env'])==null?void 0x0:_0x11f45d[_0x262543(0x165)])===_0x262543(0x180);(_0x1ff14a==='next.js'||_0x1ff14a==='remix'||_0x1ff14a===_0x262543(0x1c4)||_0x1ff14a===_0x262543(0x213))&&(_0x1ff14a+=_0x5497ef?_0x262543(0x1d5):_0x262543(0x1af)),_0x436ba9[_0x262543(0x218)]={'id':+new Date(),'tool':_0x1ff14a},_0x390747&&_0x1ff14a&&!_0x5497ef&&console[_0x262543(0x1ff)](_0x262543(0x19c)+(_0x1ff14a[_0x262543(0x138)](0x0)[_0x262543(0x15e)]()+_0x1ff14a[_0x262543(0x200)](0x1))+',','background:\\x20rgb(30,30,30);\\x20color:\\x20rgb(255,213,92)',_0x262543(0x1b6));}let _0x5903dc=new x(_0x436ba9,_0x141603,_0x4893f9,_0x26756b,_0x6a31ab,_0x39e67e);return _0x5903dc['send'][_0x262543(0x1fe)](_0x5903dc);}catch(_0x3862d9){return console[_0x262543(0x219)](_0x262543(0x16a),_0x3862d9&&_0x3862d9[_0x262543(0x20a)]),()=>{};}});return _0x105a50=>_0x2776b7['forEach'](_0xb52cb0=>_0xb52cb0(_0x105a50));}function ie(_0x57c726,_0x25e1a6,_0x4b918e,_0x393acd){var _0x30aa88=_0x277122;_0x393acd&&_0x57c726===_0x30aa88(0x1d2)&&_0x4b918e[_0x30aa88(0x21b)][_0x30aa88(0x1d2)]();}function b(_0x51a80f){var _0x22a25f=_0x277122,_0x403a3b,_0x191ef6;let _0x1cc190=function(_0x2c9f39,_0x181012){return _0x181012-_0x2c9f39;},_0x4a578f;if(_0x51a80f['performance'])_0x4a578f=function(){var _0x3c9dfa=_0xc5ab;return _0x51a80f[_0x3c9dfa(0x208)]['now']();};else{if(_0x51a80f[_0x22a25f(0x174)]&&_0x51a80f[_0x22a25f(0x174)][_0x22a25f(0x158)]&&((_0x191ef6=(_0x403a3b=_0x51a80f['process'])==null?void 0x0:_0x403a3b[_0x22a25f(0x14c)])==null?void 0x0:_0x191ef6[_0x22a25f(0x165)])!==_0x22a25f(0x180))_0x4a578f=function(){var _0x2444fc=_0x22a25f;return _0x51a80f[_0x2444fc(0x174)][_0x2444fc(0x158)]();},_0x1cc190=function(_0x429c4e,_0x2e24d2){return 0x3e8*(_0x2e24d2[0x0]-_0x429c4e[0x0])+(_0x2e24d2[0x1]-_0x429c4e[0x1])/0xf4240;};else try{let {performance:_0x10386f}=require(_0x22a25f(0x120));_0x4a578f=function(){return _0x10386f['now']();};}catch{_0x4a578f=function(){return+new Date();};}}return{'elapsed':_0x1cc190,'timeStamp':_0x4a578f,'now':()=>Date['now']()};}function _0xc5ab(_0x2fbc92,_0x10d741){var _0x16b566=_0x16b5();return _0xc5ab=function(_0xc5ab16,_0x5acc82){_0xc5ab16=_0xc5ab16-0x120;var _0x534c80=_0x16b566[_0xc5ab16];return _0x534c80;},_0xc5ab(_0x2fbc92,_0x10d741);}function H(_0x410216,_0xd35cc7,_0xbf32c5){var _0x14cd8d=_0x277122,_0x16579a,_0x23a1e8,_0x5506c0,_0x31ef37,_0x53bbed;if(_0x410216[_0x14cd8d(0x214)]!==void 0x0)return _0x410216[_0x14cd8d(0x214)];let _0xdc0a0b=((_0x23a1e8=(_0x16579a=_0x410216[_0x14cd8d(0x174)])==null?void 0x0:_0x16579a['versions'])==null?void 0x0:_0x23a1e8[_0x14cd8d(0x1f2)])||((_0x31ef37=(_0x5506c0=_0x410216[_0x14cd8d(0x174)])==null?void 0x0:_0x5506c0[_0x14cd8d(0x14c)])==null?void 0x0:_0x31ef37['NEXT_RUNTIME'])===_0x14cd8d(0x180);function _0x164729(_0x2cc8cb){var _0x5dd6b2=_0x14cd8d;if(_0x2cc8cb[_0x5dd6b2(0x1fa)]('/')&&_0x2cc8cb[_0x5dd6b2(0x1e7)]('/')){let _0xc83b4c=new RegExp(_0x2cc8cb[_0x5dd6b2(0x21f)](0x1,-0x1));return _0x71c0d3=>_0xc83b4c[_0x5dd6b2(0x1b1)](_0x71c0d3);}else{if(_0x2cc8cb['includes']('*')||_0x2cc8cb['includes']('?')){let _0x3874c4=new RegExp('^'+_0x2cc8cb[_0x5dd6b2(0x16d)](/\\./g,String[_0x5dd6b2(0x14e)](0x5c)+'.')[_0x5dd6b2(0x16d)](/\\*/g,'.*')[_0x5dd6b2(0x16d)](/\\?/g,'.')+String[_0x5dd6b2(0x14e)](0x24));return _0x48cfa3=>_0x3874c4[_0x5dd6b2(0x1b1)](_0x48cfa3);}else return _0x4e1229=>_0x4e1229===_0x2cc8cb;}}let _0x12eb1d=_0xd35cc7[_0x14cd8d(0x190)](_0x164729);return _0x410216[_0x14cd8d(0x214)]=_0xdc0a0b||!_0xd35cc7,!_0x410216[_0x14cd8d(0x214)]&&((_0x53bbed=_0x410216['location'])==null?void 0x0:_0x53bbed[_0x14cd8d(0x1de)])&&(_0x410216[_0x14cd8d(0x214)]=_0x12eb1d[_0x14cd8d(0x1b4)](_0x59667b=>_0x59667b(_0x410216[_0x14cd8d(0x21b)][_0x14cd8d(0x1de)]))),_0x410216['_consoleNinjaAllowedToStart'];}function X(_0x2b666a,_0x4cdb6e,_0x2e19ea,_0x489f64){var _0xc83fb0=_0x277122;_0x2b666a=_0x2b666a,_0x4cdb6e=_0x4cdb6e,_0x2e19ea=_0x2e19ea,_0x489f64=_0x489f64;let _0x341dd5=b(_0x2b666a),_0xb59bb1=_0x341dd5[_0xc83fb0(0x1ef)],_0x7ae3d3=_0x341dd5[_0xc83fb0(0x1eb)];class _0x3433bd{constructor(){var _0x5f27e6=_0xc83fb0;this[_0x5f27e6(0x206)]=/^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)[_$a-zA-Z\\xA0-\\uFFFF][_$a-zA-Z0-9\\xA0-\\uFFFF]*$/,this[_0x5f27e6(0x18b)]=/^(0|[1-9][0-9]*)$/,this['_quotedRegExp']=/'([^\\\\']|\\\\')*'/,this[_0x5f27e6(0x1e9)]=_0x2b666a[_0x5f27e6(0x1a6)],this['_HTMLAllCollection']=_0x2b666a['HTMLAllCollection'],this[_0x5f27e6(0x192)]=Object[_0x5f27e6(0x18a)],this[_0x5f27e6(0x1bc)]=Object[_0x5f27e6(0x1ed)],this[_0x5f27e6(0x1e8)]=_0x2b666a[_0x5f27e6(0x1c1)],this[_0x5f27e6(0x127)]=RegExp[_0x5f27e6(0x20b)][_0x5f27e6(0x193)],this[_0x5f27e6(0x17f)]=Date[_0x5f27e6(0x20b)][_0x5f27e6(0x193)];}['serialize'](_0x2974e5,_0x3545b9,_0x3efb50,_0x496b06){var _0x481a9d=_0xc83fb0,_0x3b5534=this,_0x243f09=_0x3efb50['autoExpand'];function _0x29e913(_0x52177f,_0xff78c8,_0x71f387){var _0x3afd02=_0xc5ab;_0xff78c8['type']=_0x3afd02(0x1b8),_0xff78c8[_0x3afd02(0x1d6)]=_0x52177f[_0x3afd02(0x20a)],_0x8497a7=_0x71f387[_0x3afd02(0x1f2)][_0x3afd02(0x18c)],_0x71f387[_0x3afd02(0x1f2)][_0x3afd02(0x18c)]=_0xff78c8,_0x3b5534[_0x3afd02(0x16b)](_0xff78c8,_0x71f387);}try{_0x3efb50[_0x481a9d(0x148)]++,_0x3efb50[_0x481a9d(0x196)]&&_0x3efb50[_0x481a9d(0x15d)][_0x481a9d(0x153)](_0x3545b9);var _0xd6bb22,_0x3aea1c,_0x31a2fd,_0x182842,_0x6ddd0=[],_0xab73e6=[],_0x4bcc75,_0xcd237d=this['_type'](_0x3545b9),_0x2ce24b=_0xcd237d===_0x481a9d(0x183),_0x22b2e9=!0x1,_0x3d29d9=_0xcd237d===_0x481a9d(0x1f3),_0x53ba8c=this[_0x481a9d(0x202)](_0xcd237d),_0x4af369=this[_0x481a9d(0x201)](_0xcd237d),_0x22bb70=_0x53ba8c||_0x4af369,_0x286ee0={},_0x1fe6b7=0x0,_0x598e0b=!0x1,_0x8497a7,_0x31a94=/^(([1-9]{1}[0-9]*)|0)$/;if(_0x3efb50['depth']){if(_0x2ce24b){if(_0x3aea1c=_0x3545b9['length'],_0x3aea1c>_0x3efb50[_0x481a9d(0x17a)]){for(_0x31a2fd=0x0,_0x182842=_0x3efb50[_0x481a9d(0x17a)],_0xd6bb22=_0x31a2fd;_0xd6bb22<_0x182842;_0xd6bb22++)_0xab73e6[_0x481a9d(0x153)](_0x3b5534[_0x481a9d(0x1ab)](_0x6ddd0,_0x3545b9,_0xcd237d,_0xd6bb22,_0x3efb50));_0x2974e5[_0x481a9d(0x151)]=!0x0;}else{for(_0x31a2fd=0x0,_0x182842=_0x3aea1c,_0xd6bb22=_0x31a2fd;_0xd6bb22<_0x182842;_0xd6bb22++)_0xab73e6[_0x481a9d(0x153)](_0x3b5534[_0x481a9d(0x1ab)](_0x6ddd0,_0x3545b9,_0xcd237d,_0xd6bb22,_0x3efb50));}_0x3efb50[_0x481a9d(0x179)]+=_0xab73e6[_0x481a9d(0x122)];}if(!(_0xcd237d===_0x481a9d(0x1a0)||_0xcd237d===_0x481a9d(0x1a6))&&!_0x53ba8c&&_0xcd237d!==_0x481a9d(0x12b)&&_0xcd237d!==_0x481a9d(0x19d)&&_0xcd237d!=='bigint'){var _0x4aa6af=_0x496b06['props']||_0x3efb50['props'];if(this[_0x481a9d(0x176)](_0x3545b9)?(_0xd6bb22=0x0,_0x3545b9[_0x481a9d(0x12d)](function(_0x5c22f4){var _0x5623fa=_0x481a9d;if(_0x1fe6b7++,_0x3efb50[_0x5623fa(0x179)]++,_0x1fe6b7>_0x4aa6af){_0x598e0b=!0x0;return;}if(!_0x3efb50[_0x5623fa(0x1f1)]&&_0x3efb50[_0x5623fa(0x196)]&&_0x3efb50[_0x5623fa(0x179)]>_0x3efb50[_0x5623fa(0x168)]){_0x598e0b=!0x0;return;}_0xab73e6[_0x5623fa(0x153)](_0x3b5534['_addProperty'](_0x6ddd0,_0x3545b9,'Set',_0xd6bb22++,_0x3efb50,function(_0x1fd311){return function(){return _0x1fd311;};}(_0x5c22f4)));})):this[_0x481a9d(0x1bf)](_0x3545b9)&&_0x3545b9['forEach'](function(_0x55efdb,_0xab32c5){var _0x2c0851=_0x481a9d;if(_0x1fe6b7++,_0x3efb50[_0x2c0851(0x179)]++,_0x1fe6b7>_0x4aa6af){_0x598e0b=!0x0;return;}if(!_0x3efb50['isExpressionToEvaluate']&&_0x3efb50[_0x2c0851(0x196)]&&_0x3efb50['autoExpandPropertyCount']>_0x3efb50[_0x2c0851(0x168)]){_0x598e0b=!0x0;return;}var _0x20c352=_0xab32c5[_0x2c0851(0x193)]();_0x20c352[_0x2c0851(0x122)]>0x64&&(_0x20c352=_0x20c352['slice'](0x0,0x64)+_0x2c0851(0x139)),_0xab73e6['push'](_0x3b5534[_0x2c0851(0x1ab)](_0x6ddd0,_0x3545b9,'Map',_0x20c352,_0x3efb50,function(_0x20b4d2){return function(){return _0x20b4d2;};}(_0x55efdb)));}),!_0x22b2e9){try{for(_0x4bcc75 in _0x3545b9)if(!(_0x2ce24b&&_0x31a94[_0x481a9d(0x1b1)](_0x4bcc75))&&!this[_0x481a9d(0x1ae)](_0x3545b9,_0x4bcc75,_0x3efb50)){if(_0x1fe6b7++,_0x3efb50[_0x481a9d(0x179)]++,_0x1fe6b7>_0x4aa6af){_0x598e0b=!0x0;break;}if(!_0x3efb50[_0x481a9d(0x1f1)]&&_0x3efb50[_0x481a9d(0x196)]&&_0x3efb50[_0x481a9d(0x179)]>_0x3efb50['autoExpandLimit']){_0x598e0b=!0x0;break;}_0xab73e6[_0x481a9d(0x153)](_0x3b5534[_0x481a9d(0x1f8)](_0x6ddd0,_0x286ee0,_0x3545b9,_0xcd237d,_0x4bcc75,_0x3efb50));}}catch{}if(_0x286ee0['_p_length']=!0x0,_0x3d29d9&&(_0x286ee0[_0x481a9d(0x123)]=!0x0),!_0x598e0b){var _0x55fd1e=[][_0x481a9d(0x187)](this[_0x481a9d(0x1bc)](_0x3545b9))[_0x481a9d(0x187)](this['_getOwnPropertySymbols'](_0x3545b9));for(_0xd6bb22=0x0,_0x3aea1c=_0x55fd1e['length'];_0xd6bb22<_0x3aea1c;_0xd6bb22++)if(_0x4bcc75=_0x55fd1e[_0xd6bb22],!(_0x2ce24b&&_0x31a94[_0x481a9d(0x1b1)](_0x4bcc75[_0x481a9d(0x193)]()))&&!this['_blacklistedProperty'](_0x3545b9,_0x4bcc75,_0x3efb50)&&!_0x286ee0[_0x481a9d(0x134)+_0x4bcc75[_0x481a9d(0x193)]()]){if(_0x1fe6b7++,_0x3efb50[_0x481a9d(0x179)]++,_0x1fe6b7>_0x4aa6af){_0x598e0b=!0x0;break;}if(!_0x3efb50[_0x481a9d(0x1f1)]&&_0x3efb50[_0x481a9d(0x196)]&&_0x3efb50[_0x481a9d(0x179)]>_0x3efb50['autoExpandLimit']){_0x598e0b=!0x0;break;}_0xab73e6[_0x481a9d(0x153)](_0x3b5534[_0x481a9d(0x1f8)](_0x6ddd0,_0x286ee0,_0x3545b9,_0xcd237d,_0x4bcc75,_0x3efb50));}}}}}if(_0x2974e5[_0x481a9d(0x150)]=_0xcd237d,_0x22bb70?(_0x2974e5[_0x481a9d(0x13c)]=_0x3545b9['valueOf'](),this[_0x481a9d(0x143)](_0xcd237d,_0x2974e5,_0x3efb50,_0x496b06)):_0xcd237d===_0x481a9d(0x170)?_0x2974e5['value']=this[_0x481a9d(0x17f)][_0x481a9d(0x154)](_0x3545b9):_0xcd237d===_0x481a9d(0x1d8)?_0x2974e5[_0x481a9d(0x13c)]=_0x3545b9[_0x481a9d(0x193)]():_0xcd237d===_0x481a9d(0x1c3)?_0x2974e5['value']=this[_0x481a9d(0x127)][_0x481a9d(0x154)](_0x3545b9):_0xcd237d==='symbol'&&this['_Symbol']?_0x2974e5[_0x481a9d(0x13c)]=this[_0x481a9d(0x1e8)][_0x481a9d(0x20b)][_0x481a9d(0x193)][_0x481a9d(0x154)](_0x3545b9):!_0x3efb50[_0x481a9d(0x1a9)]&&!(_0xcd237d===_0x481a9d(0x1a0)||_0xcd237d===_0x481a9d(0x1a6))&&(delete _0x2974e5[_0x481a9d(0x13c)],_0x2974e5[_0x481a9d(0x12c)]=!0x0),_0x598e0b&&(_0x2974e5[_0x481a9d(0x1dc)]=!0x0),_0x8497a7=_0x3efb50[_0x481a9d(0x1f2)]['current'],_0x3efb50[_0x481a9d(0x1f2)][_0x481a9d(0x18c)]=_0x2974e5,this[_0x481a9d(0x16b)](_0x2974e5,_0x3efb50),_0xab73e6[_0x481a9d(0x122)]){for(_0xd6bb22=0x0,_0x3aea1c=_0xab73e6[_0x481a9d(0x122)];_0xd6bb22<_0x3aea1c;_0xd6bb22++)_0xab73e6[_0xd6bb22](_0xd6bb22);}_0x6ddd0[_0x481a9d(0x122)]&&(_0x2974e5[_0x481a9d(0x197)]=_0x6ddd0);}catch(_0x202c18){_0x29e913(_0x202c18,_0x2974e5,_0x3efb50);}return this[_0x481a9d(0x171)](_0x3545b9,_0x2974e5),this[_0x481a9d(0x204)](_0x2974e5,_0x3efb50),_0x3efb50[_0x481a9d(0x1f2)][_0x481a9d(0x18c)]=_0x8497a7,_0x3efb50[_0x481a9d(0x148)]--,_0x3efb50[_0x481a9d(0x196)]=_0x243f09,_0x3efb50[_0x481a9d(0x196)]&&_0x3efb50[_0x481a9d(0x15d)][_0x481a9d(0x14b)](),_0x2974e5;}[_0xc83fb0(0x1ce)](_0x453c25){var _0x1c6ef1=_0xc83fb0;return Object[_0x1c6ef1(0x1db)]?Object[_0x1c6ef1(0x1db)](_0x453c25):[];}[_0xc83fb0(0x176)](_0x26e14a){var _0x5c57ea=_0xc83fb0;return!!(_0x26e14a&&_0x2b666a['Set']&&this['_objectToString'](_0x26e14a)===_0x5c57ea(0x178)&&_0x26e14a[_0x5c57ea(0x12d)]);}[_0xc83fb0(0x1ae)](_0x3e947d,_0x4d1e75,_0x149612){var _0x3cf397=_0xc83fb0;return _0x149612[_0x3cf397(0x1f9)]?typeof _0x3e947d[_0x4d1e75]=='function':!0x1;}[_0xc83fb0(0x164)](_0x132cfb){var _0x123d06=_0xc83fb0,_0x1f311c='';return _0x1f311c=typeof _0x132cfb,_0x1f311c===_0x123d06(0x1b5)?this[_0x123d06(0x1df)](_0x132cfb)===_0x123d06(0x1cc)?_0x1f311c='array':this[_0x123d06(0x1df)](_0x132cfb)==='[object\\x20Date]'?_0x1f311c=_0x123d06(0x170):this[_0x123d06(0x1df)](_0x132cfb)===_0x123d06(0x1a5)?_0x1f311c=_0x123d06(0x1d8):_0x132cfb===null?_0x1f311c=_0x123d06(0x1a0):_0x132cfb[_0x123d06(0x20c)]&&(_0x1f311c=_0x132cfb[_0x123d06(0x20c)][_0x123d06(0x19f)]||_0x1f311c):_0x1f311c===_0x123d06(0x1a6)&&this[_0x123d06(0x1b7)]&&_0x132cfb instanceof this[_0x123d06(0x1b7)]&&(_0x1f311c=_0x123d06(0x191)),_0x1f311c;}['_objectToString'](_0xe15424){var _0x2dfa4f=_0xc83fb0;return Object['prototype'][_0x2dfa4f(0x193)][_0x2dfa4f(0x154)](_0xe15424);}[_0xc83fb0(0x202)](_0x1c7e27){var _0x437108=_0xc83fb0;return _0x1c7e27===_0x437108(0x21a)||_0x1c7e27==='string'||_0x1c7e27===_0x437108(0x216);}[_0xc83fb0(0x201)](_0x2daba1){var _0x5ae4a7=_0xc83fb0;return _0x2daba1===_0x5ae4a7(0x1cd)||_0x2daba1===_0x5ae4a7(0x12b)||_0x2daba1===_0x5ae4a7(0x186);}[_0xc83fb0(0x1ab)](_0x20f9a1,_0x327b4a,_0xbf4be6,_0x48d02d,_0x1f56f9,_0x5da251){var _0x4f6931=this;return function(_0x5c3cf3){var _0x7d5aec=_0xc5ab,_0xfcd658=_0x1f56f9[_0x7d5aec(0x1f2)][_0x7d5aec(0x18c)],_0xb428d1=_0x1f56f9[_0x7d5aec(0x1f2)]['index'],_0x50ca98=_0x1f56f9[_0x7d5aec(0x1f2)][_0x7d5aec(0x131)];_0x1f56f9[_0x7d5aec(0x1f2)][_0x7d5aec(0x131)]=_0xfcd658,_0x1f56f9[_0x7d5aec(0x1f2)]['index']=typeof _0x48d02d=='number'?_0x48d02d:_0x5c3cf3,_0x20f9a1[_0x7d5aec(0x153)](_0x4f6931[_0x7d5aec(0x1c2)](_0x327b4a,_0xbf4be6,_0x48d02d,_0x1f56f9,_0x5da251)),_0x1f56f9[_0x7d5aec(0x1f2)][_0x7d5aec(0x131)]=_0x50ca98,_0x1f56f9[_0x7d5aec(0x1f2)]['index']=_0xb428d1;};}[_0xc83fb0(0x1f8)](_0x2a642f,_0x33d34f,_0x48f024,_0x3bdd75,_0x155f6d,_0x230db2,_0x20acf6){var _0x58110a=_0xc83fb0,_0x145cac=this;return _0x33d34f[_0x58110a(0x134)+_0x155f6d[_0x58110a(0x193)]()]=!0x0,function(_0x4c8a4a){var _0x1eeefc=_0x58110a,_0x3e6bce=_0x230db2[_0x1eeefc(0x1f2)][_0x1eeefc(0x18c)],_0x57c08c=_0x230db2[_0x1eeefc(0x1f2)]['index'],_0x3070c4=_0x230db2[_0x1eeefc(0x1f2)][_0x1eeefc(0x131)];_0x230db2[_0x1eeefc(0x1f2)][_0x1eeefc(0x131)]=_0x3e6bce,_0x230db2[_0x1eeefc(0x1f2)][_0x1eeefc(0x185)]=_0x4c8a4a,_0x2a642f[_0x1eeefc(0x153)](_0x145cac['_property'](_0x48f024,_0x3bdd75,_0x155f6d,_0x230db2,_0x20acf6)),_0x230db2[_0x1eeefc(0x1f2)][_0x1eeefc(0x131)]=_0x3070c4,_0x230db2[_0x1eeefc(0x1f2)][_0x1eeefc(0x185)]=_0x57c08c;};}[_0xc83fb0(0x1c2)](_0x4bb40b,_0x2412f1,_0x415f45,_0x3d4542,_0xa974f0){var _0x2cc493=_0xc83fb0,_0x36d7ed=this;_0xa974f0||(_0xa974f0=function(_0x576be5,_0x26eb48){return _0x576be5[_0x26eb48];});var _0x4d18a9=_0x415f45['toString'](),_0x32e6ca=_0x3d4542[_0x2cc493(0x159)]||{},_0x4a8ccb=_0x3d4542[_0x2cc493(0x1a9)],_0x11c1e4=_0x3d4542[_0x2cc493(0x1f1)];try{var _0x256ca3=this[_0x2cc493(0x1bf)](_0x4bb40b),_0x4a8251=_0x4d18a9;_0x256ca3&&_0x4a8251[0x0]==='\\x27'&&(_0x4a8251=_0x4a8251[_0x2cc493(0x200)](0x1,_0x4a8251[_0x2cc493(0x122)]-0x2));var _0x4f325a=_0x3d4542[_0x2cc493(0x159)]=_0x32e6ca[_0x2cc493(0x134)+_0x4a8251];_0x4f325a&&(_0x3d4542['depth']=_0x3d4542[_0x2cc493(0x1a9)]+0x1),_0x3d4542[_0x2cc493(0x1f1)]=!!_0x4f325a;var _0x5c5c9b=typeof _0x415f45==_0x2cc493(0x152),_0xe03d99={'name':_0x5c5c9b||_0x256ca3?_0x4d18a9:this[_0x2cc493(0x181)](_0x4d18a9)};if(_0x5c5c9b&&(_0xe03d99[_0x2cc493(0x152)]=!0x0),!(_0x2412f1===_0x2cc493(0x183)||_0x2412f1==='Error')){var _0x33f2ab=this[_0x2cc493(0x192)](_0x4bb40b,_0x415f45);if(_0x33f2ab&&(_0x33f2ab[_0x2cc493(0x12a)]&&(_0xe03d99[_0x2cc493(0x175)]=!0x0),_0x33f2ab[_0x2cc493(0x1c7)]&&!_0x4f325a&&!_0x3d4542[_0x2cc493(0x1e1)]))return _0xe03d99[_0x2cc493(0x129)]=!0x0,this[_0x2cc493(0x132)](_0xe03d99,_0x3d4542),_0xe03d99;}var _0x5932aa;try{_0x5932aa=_0xa974f0(_0x4bb40b,_0x415f45);}catch(_0x1c6417){return _0xe03d99={'name':_0x4d18a9,'type':_0x2cc493(0x1b8),'error':_0x1c6417[_0x2cc493(0x20a)]},this[_0x2cc493(0x132)](_0xe03d99,_0x3d4542),_0xe03d99;}var _0x5608f4=this['_type'](_0x5932aa),_0x5934ea=this[_0x2cc493(0x202)](_0x5608f4);if(_0xe03d99['type']=_0x5608f4,_0x5934ea)this[_0x2cc493(0x132)](_0xe03d99,_0x3d4542,_0x5932aa,function(){var _0xacdd1e=_0x2cc493;_0xe03d99[_0xacdd1e(0x13c)]=_0x5932aa[_0xacdd1e(0x14d)](),!_0x4f325a&&_0x36d7ed['_capIfString'](_0x5608f4,_0xe03d99,_0x3d4542,{});});else{var _0x1e345c=_0x3d4542[_0x2cc493(0x196)]&&_0x3d4542[_0x2cc493(0x148)]<_0x3d4542[_0x2cc493(0x126)]&&_0x3d4542[_0x2cc493(0x15d)][_0x2cc493(0x1ba)](_0x5932aa)<0x0&&_0x5608f4!==_0x2cc493(0x1f3)&&_0x3d4542['autoExpandPropertyCount']<_0x3d4542[_0x2cc493(0x168)];_0x1e345c||_0x3d4542[_0x2cc493(0x148)]<_0x4a8ccb||_0x4f325a?(this[_0x2cc493(0x15a)](_0xe03d99,_0x5932aa,_0x3d4542,_0x4f325a||{}),this[_0x2cc493(0x171)](_0x5932aa,_0xe03d99)):this[_0x2cc493(0x132)](_0xe03d99,_0x3d4542,_0x5932aa,function(){var _0x10bd66=_0x2cc493;_0x5608f4==='null'||_0x5608f4===_0x10bd66(0x1a6)||(delete _0xe03d99[_0x10bd66(0x13c)],_0xe03d99[_0x10bd66(0x12c)]=!0x0);});}return _0xe03d99;}finally{_0x3d4542[_0x2cc493(0x159)]=_0x32e6ca,_0x3d4542[_0x2cc493(0x1a9)]=_0x4a8ccb,_0x3d4542['isExpressionToEvaluate']=_0x11c1e4;}}[_0xc83fb0(0x143)](_0x26e91d,_0x24781c,_0x5bd42e,_0x4a720a){var _0x3aa044=_0xc83fb0,_0x2b3bda=_0x4a720a[_0x3aa044(0x121)]||_0x5bd42e[_0x3aa044(0x121)];if((_0x26e91d===_0x3aa044(0x1dd)||_0x26e91d===_0x3aa044(0x12b))&&_0x24781c['value']){let _0x53f015=_0x24781c['value'][_0x3aa044(0x122)];_0x5bd42e[_0x3aa044(0x21d)]+=_0x53f015,_0x5bd42e['allStrLength']>_0x5bd42e[_0x3aa044(0x1c8)]?(_0x24781c[_0x3aa044(0x12c)]='',delete _0x24781c['value']):_0x53f015>_0x2b3bda&&(_0x24781c[_0x3aa044(0x12c)]=_0x24781c[_0x3aa044(0x13c)][_0x3aa044(0x200)](0x0,_0x2b3bda),delete _0x24781c[_0x3aa044(0x13c)]);}}['_isMap'](_0x13d4b6){var _0x5a2e33=_0xc83fb0;return!!(_0x13d4b6&&_0x2b666a[_0x5a2e33(0x1bb)]&&this[_0x5a2e33(0x1df)](_0x13d4b6)===_0x5a2e33(0x1c9)&&_0x13d4b6[_0x5a2e33(0x12d)]);}[_0xc83fb0(0x181)](_0x249276){var _0x265167=_0xc83fb0;if(_0x249276[_0x265167(0x18e)](/^\\d+$/))return _0x249276;var _0x249664;try{_0x249664=JSON['stringify'](''+_0x249276);}catch{_0x249664='\\x22'+this[_0x265167(0x1df)](_0x249276)+'\\x22';}return _0x249664[_0x265167(0x18e)](/^\"([a-zA-Z_][a-zA-Z_0-9]*)\"$/)?_0x249664=_0x249664[_0x265167(0x200)](0x1,_0x249664[_0x265167(0x122)]-0x2):_0x249664=_0x249664[_0x265167(0x16d)](/'/g,'\\x5c\\x27')[_0x265167(0x16d)](/\\\\\"/g,'\\x22')['replace'](/(^\"|\"$)/g,'\\x27'),_0x249664;}[_0xc83fb0(0x132)](_0x45f4f2,_0x1a9b2b,_0x2029c2,_0x31d872){var _0xb6755c=_0xc83fb0;this[_0xb6755c(0x16b)](_0x45f4f2,_0x1a9b2b),_0x31d872&&_0x31d872(),this[_0xb6755c(0x171)](_0x2029c2,_0x45f4f2),this['_treeNodePropertiesAfterFullValue'](_0x45f4f2,_0x1a9b2b);}[_0xc83fb0(0x16b)](_0x34c63e,_0xe2d82b){var _0x50a303=_0xc83fb0;this[_0x50a303(0x1e2)](_0x34c63e,_0xe2d82b),this[_0x50a303(0x14f)](_0x34c63e,_0xe2d82b),this[_0x50a303(0x1e0)](_0x34c63e,_0xe2d82b),this[_0x50a303(0x1bd)](_0x34c63e,_0xe2d82b);}['_setNodeId'](_0x5e991e,_0x9dba11){}[_0xc83fb0(0x14f)](_0x252482,_0x2ec202){}[_0xc83fb0(0x17e)](_0xd737d3,_0x48958c){}[_0xc83fb0(0x1c0)](_0x25e050){var _0x86a0a0=_0xc83fb0;return _0x25e050===this[_0x86a0a0(0x1e9)];}[_0xc83fb0(0x204)](_0x59a6ad,_0x21713c){var _0x417cc8=_0xc83fb0;this[_0x417cc8(0x17e)](_0x59a6ad,_0x21713c),this[_0x417cc8(0x1a1)](_0x59a6ad),_0x21713c[_0x417cc8(0x169)]&&this[_0x417cc8(0x144)](_0x59a6ad),this[_0x417cc8(0x1ee)](_0x59a6ad,_0x21713c),this['_addLoadNode'](_0x59a6ad,_0x21713c),this[_0x417cc8(0x163)](_0x59a6ad);}[_0xc83fb0(0x171)](_0x368a80,_0x3bf559){var _0x5e4474=_0xc83fb0;let _0x15b644;try{_0x2b666a[_0x5e4474(0x1e5)]&&(_0x15b644=_0x2b666a[_0x5e4474(0x1e5)][_0x5e4474(0x1d6)],_0x2b666a[_0x5e4474(0x1e5)]['error']=function(){}),_0x368a80&&typeof _0x368a80['length']==_0x5e4474(0x216)&&(_0x3bf559[_0x5e4474(0x122)]=_0x368a80['length']);}catch{}finally{_0x15b644&&(_0x2b666a['console'][_0x5e4474(0x1d6)]=_0x15b644);}if(_0x3bf559['type']===_0x5e4474(0x216)||_0x3bf559['type']===_0x5e4474(0x186)){if(isNaN(_0x3bf559[_0x5e4474(0x13c)]))_0x3bf559[_0x5e4474(0x1ad)]=!0x0,delete _0x3bf559[_0x5e4474(0x13c)];else switch(_0x3bf559[_0x5e4474(0x13c)]){case Number['POSITIVE_INFINITY']:_0x3bf559[_0x5e4474(0x199)]=!0x0,delete _0x3bf559['value'];break;case Number[_0x5e4474(0x135)]:_0x3bf559[_0x5e4474(0x18d)]=!0x0,delete _0x3bf559[_0x5e4474(0x13c)];break;case 0x0:this['_isNegativeZero'](_0x3bf559[_0x5e4474(0x13c)])&&(_0x3bf559[_0x5e4474(0x1da)]=!0x0);break;}}else _0x3bf559[_0x5e4474(0x150)]===_0x5e4474(0x1f3)&&typeof _0x368a80[_0x5e4474(0x19f)]==_0x5e4474(0x1dd)&&_0x368a80[_0x5e4474(0x19f)]&&_0x3bf559[_0x5e4474(0x19f)]&&_0x368a80[_0x5e4474(0x19f)]!==_0x3bf559[_0x5e4474(0x19f)]&&(_0x3bf559['funcName']=_0x368a80[_0x5e4474(0x19f)]);}[_0xc83fb0(0x1fb)](_0x340a19){var _0x2e6ef9=_0xc83fb0;return 0x1/_0x340a19===Number[_0x2e6ef9(0x135)];}[_0xc83fb0(0x144)](_0x2109f2){var _0x1074c3=_0xc83fb0;!_0x2109f2['props']||!_0x2109f2[_0x1074c3(0x197)][_0x1074c3(0x122)]||_0x2109f2[_0x1074c3(0x150)]===_0x1074c3(0x183)||_0x2109f2[_0x1074c3(0x150)]===_0x1074c3(0x1bb)||_0x2109f2['type']===_0x1074c3(0x1e4)||_0x2109f2[_0x1074c3(0x197)][_0x1074c3(0x1cf)](function(_0x579bbe,_0xd3668f){var _0x5c0a3c=_0x1074c3,_0x179ea1=_0x579bbe[_0x5c0a3c(0x19f)][_0x5c0a3c(0x17d)](),_0x394e8a=_0xd3668f[_0x5c0a3c(0x19f)][_0x5c0a3c(0x17d)]();return _0x179ea1<_0x394e8a?-0x1:_0x179ea1>_0x394e8a?0x1:0x0;});}['_addFunctionsNode'](_0x5b4bf1,_0x74c4fe){var _0x87fdfe=_0xc83fb0;if(!(_0x74c4fe[_0x87fdfe(0x1f9)]||!_0x5b4bf1[_0x87fdfe(0x197)]||!_0x5b4bf1[_0x87fdfe(0x197)]['length'])){for(var _0x3ac3f4=[],_0x4ceb3a=[],_0x260f45=0x0,_0xf2dbe6=_0x5b4bf1[_0x87fdfe(0x197)][_0x87fdfe(0x122)];_0x260f45<_0xf2dbe6;_0x260f45++){var _0x22c70b=_0x5b4bf1[_0x87fdfe(0x197)][_0x260f45];_0x22c70b['type']===_0x87fdfe(0x1f3)?_0x3ac3f4[_0x87fdfe(0x153)](_0x22c70b):_0x4ceb3a[_0x87fdfe(0x153)](_0x22c70b);}if(!(!_0x4ceb3a[_0x87fdfe(0x122)]||_0x3ac3f4[_0x87fdfe(0x122)]<=0x1)){_0x5b4bf1['props']=_0x4ceb3a;var _0x4a6b3b={'functionsNode':!0x0,'props':_0x3ac3f4};this[_0x87fdfe(0x1e2)](_0x4a6b3b,_0x74c4fe),this[_0x87fdfe(0x17e)](_0x4a6b3b,_0x74c4fe),this[_0x87fdfe(0x1a1)](_0x4a6b3b),this[_0x87fdfe(0x1bd)](_0x4a6b3b,_0x74c4fe),_0x4a6b3b['id']+='\\x20f',_0x5b4bf1[_0x87fdfe(0x197)][_0x87fdfe(0x16f)](_0x4a6b3b);}}}['_addLoadNode'](_0xe0c1f5,_0x16df52){}[_0xc83fb0(0x1a1)](_0x5e776f){}[_0xc83fb0(0x21c)](_0xed4fe0){var _0x3c283a=_0xc83fb0;return Array['isArray'](_0xed4fe0)||typeof _0xed4fe0==_0x3c283a(0x1b5)&&this[_0x3c283a(0x1df)](_0xed4fe0)===_0x3c283a(0x1cc);}[_0xc83fb0(0x1bd)](_0x45e6db,_0x317a4d){}[_0xc83fb0(0x163)](_0x403816){var _0x587472=_0xc83fb0;delete _0x403816[_0x587472(0x13f)],delete _0x403816[_0x587472(0x166)],delete _0x403816['_hasMapOnItsPath'];}[_0xc83fb0(0x1e0)](_0x420717,_0x51ec4d){}}let _0x4c6fbe=new _0x3433bd(),_0x1c73d6={'props':0x64,'elements':0x64,'strLength':0x400*0x32,'totalStrLength':0x400*0x32,'autoExpandLimit':0x1388,'autoExpandMaxDepth':0xa},_0x1300f9={'props':0x5,'elements':0x5,'strLength':0x100,'totalStrLength':0x100*0x3,'autoExpandLimit':0x1e,'autoExpandMaxDepth':0x2};function _0x3fb167(_0x4da0e2,_0x234c63,_0x2f0b10,_0x2a70ca,_0x22e30a,_0x32659a){var _0x31c0e5=_0xc83fb0;let _0x2e43e2,_0x3be46a;try{_0x3be46a=_0x7ae3d3(),_0x2e43e2=_0x2e19ea[_0x234c63],!_0x2e43e2||_0x3be46a-_0x2e43e2['ts']>0x1f4&&_0x2e43e2[_0x31c0e5(0x128)]&&_0x2e43e2[_0x31c0e5(0x145)]/_0x2e43e2[_0x31c0e5(0x128)]<0x64?(_0x2e19ea[_0x234c63]=_0x2e43e2={'count':0x0,'time':0x0,'ts':_0x3be46a},_0x2e19ea[_0x31c0e5(0x141)]={}):_0x3be46a-_0x2e19ea[_0x31c0e5(0x141)]['ts']>0x32&&_0x2e19ea[_0x31c0e5(0x141)]['count']&&_0x2e19ea[_0x31c0e5(0x141)]['time']/_0x2e19ea[_0x31c0e5(0x141)]['count']<0x64&&(_0x2e19ea[_0x31c0e5(0x141)]={});let _0x5d2500=[],_0x13b8c2=_0x2e43e2[_0x31c0e5(0x1fc)]||_0x2e19ea[_0x31c0e5(0x141)][_0x31c0e5(0x1fc)]?_0x1300f9:_0x1c73d6,_0x13c005=_0x48a809=>{var _0x12d5d2=_0x31c0e5;let _0x5f41a5={};return _0x5f41a5['props']=_0x48a809[_0x12d5d2(0x197)],_0x5f41a5[_0x12d5d2(0x17a)]=_0x48a809[_0x12d5d2(0x17a)],_0x5f41a5[_0x12d5d2(0x121)]=_0x48a809[_0x12d5d2(0x121)],_0x5f41a5['totalStrLength']=_0x48a809[_0x12d5d2(0x1c8)],_0x5f41a5[_0x12d5d2(0x168)]=_0x48a809[_0x12d5d2(0x168)],_0x5f41a5['autoExpandMaxDepth']=_0x48a809[_0x12d5d2(0x126)],_0x5f41a5['sortProps']=!0x1,_0x5f41a5[_0x12d5d2(0x1f9)]=!_0x4cdb6e,_0x5f41a5[_0x12d5d2(0x1a9)]=0x1,_0x5f41a5['level']=0x0,_0x5f41a5[_0x12d5d2(0x188)]=_0x12d5d2(0x1d0),_0x5f41a5[_0x12d5d2(0x155)]=_0x12d5d2(0x1a3),_0x5f41a5['autoExpand']=!0x0,_0x5f41a5[_0x12d5d2(0x15d)]=[],_0x5f41a5[_0x12d5d2(0x179)]=0x0,_0x5f41a5[_0x12d5d2(0x1e1)]=!0x0,_0x5f41a5[_0x12d5d2(0x21d)]=0x0,_0x5f41a5[_0x12d5d2(0x1f2)]={'current':void 0x0,'parent':void 0x0,'index':0x0},_0x5f41a5;};for(var _0x14027d=0x0;_0x14027d<_0x22e30a[_0x31c0e5(0x122)];_0x14027d++)_0x5d2500[_0x31c0e5(0x153)](_0x4c6fbe[_0x31c0e5(0x15a)]({'timeNode':_0x4da0e2===_0x31c0e5(0x145)||void 0x0},_0x22e30a[_0x14027d],_0x13c005(_0x13b8c2),{}));if(_0x4da0e2==='trace'){let _0xe6083e=Error[_0x31c0e5(0x17b)];try{Error[_0x31c0e5(0x17b)]=0x1/0x0,_0x5d2500['push'](_0x4c6fbe['serialize']({'stackNode':!0x0},new Error()[_0x31c0e5(0x211)],_0x13c005(_0x13b8c2),{'strLength':0x1/0x0}));}finally{Error[_0x31c0e5(0x17b)]=_0xe6083e;}}return{'method':_0x31c0e5(0x1ff),'version':_0x489f64,'args':[{'ts':_0x2f0b10,'session':_0x2a70ca,'args':_0x5d2500,'id':_0x234c63,'context':_0x32659a}]};}catch(_0x2b4f8b){return{'method':_0x31c0e5(0x1ff),'version':_0x489f64,'args':[{'ts':_0x2f0b10,'session':_0x2a70ca,'args':[{'type':'unknown','error':_0x2b4f8b&&_0x2b4f8b[_0x31c0e5(0x20a)]}],'id':_0x234c63,'context':_0x32659a}]};}finally{try{if(_0x2e43e2&&_0x3be46a){let _0xff9c1d=_0x7ae3d3();_0x2e43e2[_0x31c0e5(0x128)]++,_0x2e43e2[_0x31c0e5(0x145)]+=_0xb59bb1(_0x3be46a,_0xff9c1d),_0x2e43e2['ts']=_0xff9c1d,_0x2e19ea[_0x31c0e5(0x141)][_0x31c0e5(0x128)]++,_0x2e19ea['hits']['time']+=_0xb59bb1(_0x3be46a,_0xff9c1d),_0x2e19ea['hits']['ts']=_0xff9c1d,(_0x2e43e2['count']>0x32||_0x2e43e2[_0x31c0e5(0x145)]>0x64)&&(_0x2e43e2[_0x31c0e5(0x1fc)]=!0x0),(_0x2e19ea[_0x31c0e5(0x141)][_0x31c0e5(0x128)]>0x3e8||_0x2e19ea[_0x31c0e5(0x141)]['time']>0x12c)&&(_0x2e19ea[_0x31c0e5(0x141)][_0x31c0e5(0x1fc)]=!0x0);}}catch{}}}return _0x3fb167;}((_0xd84dda,_0x5747d3,_0x5b0082,_0x477f21,_0x2a68c3,_0x3f8562,_0x3a0549,_0x3db78c,_0x46c513,_0xbfe5dd,_0x18f1a0)=>{var _0x320b2d=_0x277122;if(_0xd84dda[_0x320b2d(0x1d9)])return _0xd84dda['_console_ninja'];if(!H(_0xd84dda,_0x3db78c,_0x2a68c3))return _0xd84dda[_0x320b2d(0x1d9)]={'consoleLog':()=>{},'consoleTrace':()=>{},'consoleTime':()=>{},'consoleTimeEnd':()=>{},'autoLog':()=>{},'autoLogMany':()=>{},'autoTraceMany':()=>{},'coverage':()=>{},'autoTrace':()=>{},'autoTime':()=>{},'autoTimeEnd':()=>{}},_0xd84dda['_console_ninja'];let _0x4fb6c4=b(_0xd84dda),_0x5b3f8e=_0x4fb6c4[_0x320b2d(0x1ef)],_0x479531=_0x4fb6c4[_0x320b2d(0x1eb)],_0x177654=_0x4fb6c4[_0x320b2d(0x177)],_0x25d606={'hits':{},'ts':{}},_0x6aa2d2=X(_0xd84dda,_0x46c513,_0x25d606,_0x3f8562),_0x2f092d=_0x4d5c8f=>{_0x25d606['ts'][_0x4d5c8f]=_0x479531();},_0x492afb=(_0x3065ce,_0x3451d9)=>{var _0x43323f=_0x320b2d;let _0x378abc=_0x25d606['ts'][_0x3451d9];if(delete _0x25d606['ts'][_0x3451d9],_0x378abc){let _0xc54ea1=_0x5b3f8e(_0x378abc,_0x479531());_0x4abd9f(_0x6aa2d2(_0x43323f(0x145),_0x3065ce,_0x177654(),_0x1dcfcb,[_0xc54ea1],_0x3451d9));}},_0x4f8d09=_0x51145b=>{var _0x3296a6=_0x320b2d,_0x2e7901;return _0x2a68c3===_0x3296a6(0x18f)&&_0xd84dda[_0x3296a6(0x221)]&&((_0x2e7901=_0x51145b==null?void 0x0:_0x51145b[_0x3296a6(0x13e)])==null?void 0x0:_0x2e7901[_0x3296a6(0x122)])&&(_0x51145b[_0x3296a6(0x13e)][0x0][_0x3296a6(0x221)]=_0xd84dda[_0x3296a6(0x221)]),_0x51145b;};_0xd84dda['_console_ninja']={'consoleLog':(_0x34542f,_0x1e7acf)=>{var _0x33d79c=_0x320b2d;_0xd84dda[_0x33d79c(0x1e5)]['log'][_0x33d79c(0x19f)]!==_0x33d79c(0x19b)&&_0x4abd9f(_0x6aa2d2(_0x33d79c(0x1ff),_0x34542f,_0x177654(),_0x1dcfcb,_0x1e7acf));},'consoleTrace':(_0x58cfc2,_0x3b1473)=>{var _0x43d259=_0x320b2d;_0xd84dda[_0x43d259(0x1e5)][_0x43d259(0x1ff)][_0x43d259(0x19f)]!=='disabledTrace'&&_0x4abd9f(_0x4f8d09(_0x6aa2d2(_0x43d259(0x13a),_0x58cfc2,_0x177654(),_0x1dcfcb,_0x3b1473)));},'consoleTime':_0x19ca9e=>{_0x2f092d(_0x19ca9e);},'consoleTimeEnd':(_0x3c1c7d,_0x259c13)=>{_0x492afb(_0x259c13,_0x3c1c7d);},'autoLog':(_0x50a502,_0x2ec9ac)=>{var _0x11fb8c=_0x320b2d;_0x4abd9f(_0x6aa2d2(_0x11fb8c(0x1ff),_0x2ec9ac,_0x177654(),_0x1dcfcb,[_0x50a502]));},'autoLogMany':(_0x39367a,_0x33dff6)=>{var _0x3f364b=_0x320b2d;_0x4abd9f(_0x6aa2d2(_0x3f364b(0x1ff),_0x39367a,_0x177654(),_0x1dcfcb,_0x33dff6));},'autoTrace':(_0x4de991,_0x1c9190)=>{var _0x31dbb7=_0x320b2d;_0x4abd9f(_0x4f8d09(_0x6aa2d2(_0x31dbb7(0x13a),_0x1c9190,_0x177654(),_0x1dcfcb,[_0x4de991])));},'autoTraceMany':(_0x48d7ba,_0x5770f9)=>{var _0x445bc1=_0x320b2d;_0x4abd9f(_0x4f8d09(_0x6aa2d2(_0x445bc1(0x13a),_0x48d7ba,_0x177654(),_0x1dcfcb,_0x5770f9)));},'autoTime':(_0x456f75,_0x2d3903,_0x58530c)=>{_0x2f092d(_0x58530c);},'autoTimeEnd':(_0x3faefd,_0x1c4496,_0x5d7ac7)=>{_0x492afb(_0x1c4496,_0x5d7ac7);},'coverage':_0x3e26ed=>{_0x4abd9f({'method':'coverage','version':_0x3f8562,'args':[{'id':_0x3e26ed}]});}};let _0x4abd9f=q(_0xd84dda,_0x5747d3,_0x5b0082,_0x477f21,_0x2a68c3,_0xbfe5dd,_0x18f1a0),_0x1dcfcb=_0xd84dda[_0x320b2d(0x218)];return _0xd84dda[_0x320b2d(0x1d9)];})(globalThis,_0x277122(0x1ec),_0x277122(0x1a4),_0x277122(0x14a),_0x277122(0x198),_0x277122(0x207),_0x277122(0x1be),_0x277122(0x194),_0x277122(0x217),_0x277122(0x1d3),_0x277122(0x137));");}catch(e){}};/* istanbul ignore next */function oo_oo(i,...v){try{oo_cm().consoleLog(i, v);}catch(e){} return v};/* istanbul ignore next */function oo_tr(i,...v){try{oo_cm().consoleTrace(i, v);}catch(e){} return v};/* istanbul ignore next */function oo_ts(v){try{oo_cm().consoleTime(v);}catch(e){} return v;};/* istanbul ignore next */function oo_te(v, i){try{oo_cm().consoleTimeEnd(v, i);}catch(e){} return v;};/*eslint unicorn/no-abusive-eslint-disable:,eslint-comments/disable-enable-pair:,eslint-comments/no-unlimited-disable:,eslint-comments/no-aggregating-enable:,eslint-comments/no-duplicate-disable:,eslint-comments/no-unused-disable:,eslint-comments/no-unused-enable:,*/