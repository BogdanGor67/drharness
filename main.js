window.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.main-slider', {
      loop: true,
      autoPlay: true,
      speed: 600,
      slidesPerView: 1,
      spaceBetween: 0,
      autoplay: {
       delay: 5000,
     },
     grabCursor: true,
     breakpoints: {
        420: {
          slidesPerView: 2,
        },
        760: {
          slidesPerView: 3,
        },
        1000: {
          slidesPerView: 5,
        },
        1200: {
          slidesPerView: 6,
        },
        1400: {
          slidesPerView: 7,
        }
      }
    });

    const catalogSlider = new Swiper('.catalog-slider', {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        centerSlides: true,
        autoPlay: false,
    });

    function chooseSize(blocks, elems) {
        let boxes = document.querySelectorAll(blocks);

        boxes.forEach(box => {
            box.addEventListener('click', (e) => {
                if (e.target.classList.contains('catalog__card-size') && !e.target.classList.contains('catalog__card-size--disabled')) {
                    box.querySelectorAll(elems).forEach(elem => elem.classList.remove('choosen'));
                    e.target.classList.add('choosen');
                }
            });
        })
    }

    function select(selectHead, selectBody, items) {
        let head = document.querySelector(selectHead);
        let body = document.querySelector(selectBody);
        let selectItems = body.querySelectorAll(items);

        head.addEventListener('click', () => {
            body.classList.toggle('selected');
        })

        selectItems.forEach(selectItem => {
            selectItem.addEventListener('click', () => {
                let content = selectItem.textContent;
                head.textContent = content;
                body.classList.remove('selected');
            })
        })
    }

    function popupClose(popup) {
        let popupElem = document.querySelector(popup);

        popupElem.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup') || e.target.classList.contains('popup-close')) {
                popupElem.remove();
                document.body.style.overflow = 'auto';
            }
        })
    }

    function changeCatalogButtonColor() {
        let catalogButtons = document.querySelectorAll('.catalog__button');

        catalogButtons.forEach(catalogButton => {
            catalogButton.addEventListener('click', (e) => {
                catalogButtons.forEach(btn => btn.classList.remove('purple'));
                e.target.closest('.catalog__button').classList.add('purple');
            });
        })
    }

    function popup(triggers, container) {
        let elements = document.querySelectorAll(triggers);
        let block = document.querySelector(container);

        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                let mainBlock = e.target.closest('.catalog__card');
                let imgSrc = mainBlock.querySelector('.catalog__card-image').src;
                let elemName = mainBlock.querySelector('.catalog__card-title').textContent;
                let size = mainBlock.querySelector('.catalog__card-sizes').querySelector('.choosen').textContent;
                let popupElement = `
                <div class="popup">
                  <div class="catalog__popup">
                      <img src="${imgSrc}" alt="image" class="catalog__popup-image">
                      <div class="catalog__popup-body">
                        <img src="images/close.png" alt="close" class="popup-close">
                        <p class="catalog__popup-name">${elemName}</p>
                        <p class="catalog__card-price catalog__popup-price">
                          <span class="catalog__card-old-price">4990 р.</span>
                          <span class="catalog__card-new-price">2990 р.</span>
                        </p>
                        <div class="custom-select catalog__popup-select">
                          <div class="custom-select__head">
                            ${size}
                          </div>
                          <ul class="custom-select__body">
                            <li class="custom-select__item">xs</li>
                            <li class="custom-select__item">s</li>
                            <li class="custom-select__item">m</li>
                            <li class="custom-select__item">l</li>
                            <li class="custom-select__item">xl</li>
                            <li class="custom-select__item">xxl</li>
                          </ul>
                        </div>
                        <form action="#" class="catalog__popup-form">
                          <input type="text" class="input-name catalog__popup-input" placeholder="Введите ваше имя">
                          <input type="phone" class="input-phone catalog__popup-input"placeholder="Введите ваш телефон">
                          <input type="submit" class="btn catalog__popup-btn" value="оформить заказ" onclick=" return false">
                        </form>
                      </div>
                    </div>
                  </div>  
              `;

              block.insertAdjacentHTML('afterbegin', popupElement);
              document.body.style.overflow = 'hidden';
              select('.custom-select__head', '.custom-select__body', '.custom-select__item');
              popupClose('.popup');
            });
        })
        
    }

    changeCatalogButtonColor();
    popup('.catalog__card-button', '.catalog');
    chooseSize('.catalog__card', '.catalog__card-size');
});



