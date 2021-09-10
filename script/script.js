document.addEventListener('DOMContentLoaded', () => {

    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal');
    const modalBlock = document.querySelector('#modalBlock');
    const closeModal = document.querySelector('#closeModal');
    const questionTitle = document.querySelector('#question');
    const formAnswers = document.querySelector('#formAnswers');
    const prev = document.querySelector('#prev');
    const next = document.querySelector('#next');

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

        let numberQuestion = 1;

        //create answers
        const renderAnswers = (index) => {

            questions[index].answers.forEach((answer) => {
                const answerItem = document.createElement('div');

                answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

                answerItem.innerHTML = `
                        <input type="${questions[index].type}" id="${answer.id}" name="answer" class="d-none">
                        <label for="answerItem1" class="d-flex flex-column justify-content-between">
                        <img class="answerImg" src=${answer.url} alt="burger">
                        <span>${answer.title}</span>
                        </label>
                `;

                formAnswers.appendChild(answerItem);
            }

            );

        };

        //insert info in questions
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';
            questionTitle.textContent = `${questions[indexQuestion].question}`;
            renderAnswers(indexQuestion);
        };

        renderQuestions(numberQuestion);

        next.onclick = () => {
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

        prev.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

    };
})

