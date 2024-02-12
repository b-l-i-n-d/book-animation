let lastScrollTop = window.scrollY || document.documentElement.scrollTop;

// document.querySelectorAll(".page").forEach((page, index) => {
//     page.innerHTML = `Page ${index + 1}`;
// });

const startScrollPosition =
    window.scrollY || document.documentElement.scrollTop;

const totalHeight = document.querySelector(".scroll-container").scrollHeight;
const scrollReact = document
    .querySelector(".scroll-container")
    .getBoundingClientRect();
const angelPerPx = 180 / (totalHeight - window.innerHeight);

window.addEventListener(
    "scroll",
    function handleScroll() {
        const scrollTopPosition =
            window.scrollY || document.documentElement.scrollTop;

        document.querySelectorAll(".page").forEach((page, index) => {
            let rotatePercentage =
                (scrollTopPosition - startScrollPosition) *
                angelPerPx *
                (index + 1);

            rotatePercentage = Math.min(rotatePercentage, 180);

            if (rotatePercentage > 85) {
                page.children[1].setAttribute(
                    "style",
                    "backface-visibility: visible"
                );
            } else {
                page.children[1].setAttribute(
                    "style",
                    "backface-visibility: hidden"
                );
            }

            if (scrollTopPosition > lastScrollTop) {
                page.setAttribute(
                    "style",
                    `transform: rotateY(${rotatePercentage}deg);z-index: -${
                        index + 1
                    }
                    `
                );
            } else if (scrollTopPosition < lastScrollTop) {
                page.setAttribute(
                    "style",
                    `transform: rotateY(${rotatePercentage}deg);
                    z-index: -${index + 1}`
                );
            }
        });

        lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;

        if (lastScrollTop === 0) {
            document.querySelectorAll(".page").forEach((page, index) => {
                page.setAttribute("style", `z-index: 0`);
            });
        }
    },
    false
);
