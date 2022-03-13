// Находим форму в DOM
let formElement = document.querySelector('.popup__content');
// Находим поля формы в DOM
let nameInput = document.querySelector('.popup__name');
let jobInput = document.querySelector('.popup__job');
console.log(nameInput.value);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
  let nameInputForm = document.querySelector('.profile__title');
  let jobInputForm = document.querySelector('.profile__subtitle');
  nameInputForm.textContent = nameInput.value;
  jobInputForm.textContent = jobInput.value;  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


