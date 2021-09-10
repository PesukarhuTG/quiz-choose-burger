document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');
    const send = document.querySelector('#send');

    const questions = [
        {
            question: "Какого цвета бургер?",
            answers: [
                {
                    id: '01',
                    title: 'Стандарт',
                    url: './image/burger.png'
                },
                {
                    id: '02',
                    title: 'Черный',
                    url: './image/burgerBlack.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Из какого мяса котлета?",
            answers: [
                {
                    id: '01',
                    title: 'Курица',
                    url: './image/chickenMeat.png'
                },
                {
                    id: '02',
                    title: 'Говядина',
                    url: './image/beefMeat.png'
                },
                {
                    id: '03',
                    title: 'Свинина',
                    url: './image/porkMeat.png'
                }
            ],
            type: 'radio'
        },
        {
            question: "Дополнительные ингредиенты?",
            answers: [
                {
                    id: '01',
                    title: 'Помидор',
                    url: './image/tomato.png'
                },
                {
                    id: '02',
                    title: 'Огурец',
                    url: './image/cucumber.png'
                },
                {
                    id: '03',
                    title: 'Салат',
                    url: './image/salad.png'
                },
                {
                    id: '04',
                    title: 'Лук',
                    url: './image/onion.png'
                }
            ],
            type: 'checkbox'
        },
        {
            question: "Добавить соус?",
            answers: [
                {
                    id: '01',
                    title: 'Чесночный',
                    url: './image/sauce1.png'
                },
                {
                    id: '02',
                    title: 'Томатный',
                    url: './image/sauce2.png'
                },
                {
                    id: '03',
                    title: 'Горчичный',
                    url: './image/sauce3.png'
                }
            ],
            type: 'radio'
        }
    ];

    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
        
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });

    const playTest = () => {

        const finalAnswers = [];

        let numberQuestion = 0;

        //create answers
        const renderAnswers = (index) => {
            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center');
                answerItem.innerHTML = `
                        <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
                        <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src=${answer.url} alt="burger">
                        <span>${answer.title}</span>
                        </label>
                `;
                formAnswers.appendChild(answerItem);
            }
            );
        };

        //rendering function for questions and answers
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            if ((numberQuestion > 0 || numberQuestion == 0) && (numberQuestion < questions.length - 1 || numberQuestion == questions.length - 1)) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                next.classList.remove('d-none');
                prev.classList.remove('d-none');
                send.classList.add('d-none');
            } 

            if (numberQuestion === 0) {
                prev.classList.add('d-none');
            }

            if (numberQuestion === questions.length) {
                next.classList.add('d-none');
                prev.classList.add('d-none');
                send.classList.remove('d-none');
                formAnswers.innerHTML = `
                    <div class="form-group">
                        <label for="numberPhone">Enter your phone number</label>
                        <input type="phone" class="form-control" id="numberPhone">
                    </div>
                `;
                questionTitle.textContent = '';
            }

            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест!';

                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
        };

        renderQuestions(numberQuestion);

        const checkAnswer = () => {
            const obj = {}; //заносим все выбранные варианты ответа
            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

            inputs.forEach((input, index) => {
                
                if ((numberQuestion > 0 || numberQuestion == 0) && (numberQuestion < questions.length - 1 || numberQuestion == questions.length - 1)) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }
            })

            finalAnswers.push(obj);
            
        };

        next.onclick = () => {
            checkAnswer(); //при нажатии next данные ответа фиксируются
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        prev.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

        send.onclick = () => {
            checkAnswer(); //при нажатии next данные ответа фиксируются
            numberQuestion++;
            renderQuestions(numberQuestion);
            console.log(finalAnswers);
        };



    };
})

