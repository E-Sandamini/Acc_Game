// ==========================================
// ACCOUNTING CLASSIFICATION LEARNING GAME
// ==========================================


// ------------------------------------------
// GAME DATA
// ------------------------------------------

const itemsData = [

    // ==========================
    // වත්කම් - ASSETS
    // ==========================

    {
        name: "ඉඩම්",
        english: "Land",
        answer: "asset",
        icon: "🏡",
        iconClass: "land"
    },

    {
        name: "ගොඩනැගිලි",
        english: "Buildings",
        answer: "asset",
        icon: "🏢",
        iconClass: "building"
    },

    {
        name: "යන්ත්‍ර උපකරණ",
        english: "Machinery & Equipment",
        answer: "asset",
        icon: "⚙️",
        iconClass: "machine"
    },

    {
        name: "තොග",
        english: "Stock",
        answer: "asset",
        icon: "📦",
        iconClass: "stock"
    },

    {
        name: "මුදල් ශේෂය",
        english: "Cash Balance",
        answer: "asset",
        icon: "💵",
        iconClass: "money"
    },

    {
        name: "මෝටර් රථ",
        english: "Motor Vehicles",
        answer: "asset",
        icon: "🚗",
        iconClass: "car"
    },


    // ==========================
    // වගකීම් - LIABILITIES
    // ==========================

    {
        name: "බැංකු ණය",
        english: "Bank Loan",
        answer: "liability",
        icon: "🏦",
        iconClass: "bank-loan"
    },

    {
        name: "ණයහිමි",
        english: "Creditors",
        answer: "liability",
        icon: "👤",
        iconClass: "creditor"
    },

    {
        name: "උපචිත විදුලිය",
        english: "Accrued Electricity",
        answer: "liability",
        icon: "⚡",
        iconClass: "electricity"
    },

    {
        name: "උපචිත රක්ෂණය",
        english: "Accrued Insurance",
        answer: "liability",
        icon: "🛡️",
        iconClass: "insurance"
    },

    {
        name: "බැංකු අයිරා",
        english: "Bank Overdraft",
        answer: "liability",
        icon: "🏧",
        iconClass: "overdraft"
    },


    // ==========================
    // හිමිකම් - EQUITY
    // ==========================

    {
        name: "ප්‍රාග්ධනය",
        english: "Capital",
        answer: "equity",
        icon: "💎",
        iconClass: "capital"
    },

    {
        name: "ගැනිලි",
        english: "Drawings",
        answer: "equity",
        icon: "💸",
        iconClass: "withdrawal"
    },

    {
        name: "ශුද්ධ ලාභය",
        english: "Net Profit",
        answer: "equity",
        icon: "📊",
        iconClass: "profit"
    },


    // ==========================
    // ආදායම් - INCOME
    // ==========================

    {
        name: "විකුණුම්",
        english: "Sales",
        answer: "income",
        icon: "🛒",
        iconClass: "sales"
    },

    {
        name: "පොලී ආදායම්",
        english: "Interest Income",
        answer: "income",
        icon: "💰",
        iconClass: "interest"
    },

    {
        name: "කොමිස් ආදායම්",
        english: "Commission Income",
        answer: "income",
        icon: "🤝",
        iconClass: "commission"
    },

    {
        name: "කුලී ලැබීම්",
        english: "Rent Received",
        answer: "income",
        icon: "🏠",
        iconClass: "rent"
    },

    {
        name: "ආයෝජන ආදායම්",
        english: "Investment Income",
        answer: "income",
        icon: "📈",
        iconClass: "interest"
    },


    // ==========================
    // වියදම් - EXPENSES
    // ==========================

    {
        name: "වැටුප්",
        english: "Salaries",
        answer: "expense",
        icon: "👨‍💼",
        iconClass: "salary"
    },

    {
        name: "විදුලි ගාස්තු",
        english: "Electricity Charges",
        answer: "expense",
        icon: "💡",
        iconClass: "electricity"
    },

    {
        name: "රක්ෂණය",
        english: "Insurance",
        answer: "expense",
        icon: "🛡️",
        iconClass: "insurance"
    },

    {
        name: "ණය පොලී",
        english: "Loan Interest",
        answer: "expense",
        icon: "💳",
        iconClass: "interest"
    },

    {
        name: "ගැණුම්",
        english: "Purchases",
        answer: "expense",
        icon: "🛍️",
        iconClass: "purchase"
    },

    {
        name: "ගොඩනැගිලි කුලී",
        english: "Building Rent",
        answer: "expense",
        icon: "🏢",
        iconClass: "rent"
    }

];


// ------------------------------------------
// VARIABLES
// ------------------------------------------

let score = 0;

let remaining =
    itemsData.length;

let draggedItem = null;

let timerInterval = null;

let elapsedSeconds = 0;

let gameStarted = false;


// ------------------------------------------
// MOBILE TOUCH VARIABLES
// ------------------------------------------

let touchItem = null;

let touchStartX = 0;

let touchStartY = 0;


// ------------------------------------------
// ELEMENTS
// ------------------------------------------

const itemsContainer =
    document.getElementById(
        "items-container"
    );


const scoreElement =
    document.getElementById(
        "score"
    );


const remainingElement =
    document.getElementById(
        "remaining"
    );


const feedback =
    document.getElementById(
        "feedback"
    );


const result =
    document.getElementById(
        "result"
    );


const finalScore =
    document.getElementById(
        "final-score"
    );


const finalTime =
    document.getElementById(
        "final-time"
    );


const restartButton =
    document.getElementById(
        "restart-btn"
    );


const startButton =
    document.getElementById(
        "start-btn"
    );


const timerElement =
    document.getElementById(
        "timer"
    );


const categories =
    document.querySelectorAll(
        ".category"
    );


// ------------------------------------------
// SHUFFLE FUNCTION
// ------------------------------------------

function shuffle(array) {

    const shuffled =
        [...array];


    for (
        let i = shuffled.length - 1;
        i > 0;
        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] =
        [
            shuffled[j],
            shuffled[i]
        ];

    }


    return shuffled;

}


// ------------------------------------------
// TIMER
// ------------------------------------------

function formatTime(seconds) {

    const minutes =
        Math.floor(
            seconds / 60
        );


    const secs =
        seconds % 60;


    return (
        String(minutes)
            .padStart(2, "0")
        +
        ":"
        +
        String(secs)
            .padStart(2, "0")
    );

}


function startTimer() {

    clearInterval(
        timerInterval
    );


    elapsedSeconds = 0;


    timerElement.textContent =
        "00:00";


    timerInterval =
        setInterval(
            function() {

                elapsedSeconds++;


                timerElement.textContent =
                    formatTime(
                        elapsedSeconds
                    );

            },
            1000
        );

}


function stopTimer() {

    clearInterval(
        timerInterval
    );


    timerInterval = null;

}


// ------------------------------------------
// CREATE ITEMS
// ------------------------------------------

function loadItems() {

    itemsContainer.innerHTML =
        "";


    const shuffledItems =
        shuffle(
            itemsData
        );


    shuffledItems.forEach(
        item => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "item-card";


            card.draggable =
                gameStarted;


            card.dataset.answer =
                item.answer;


            card.dataset.name =
                item.name;


            card.innerHTML = `

                <div class="item-icon ${item.iconClass}">
                    ${item.icon}
                </div>

                <div class="item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <span>
                        ${item.english}
                    </span>

                </div>

                <div class="drag-icon">
                    ⠿
                </div>

            `;


            itemsContainer.appendChild(
                card
            );


            // --------------------------------
            // DESKTOP DRAG START
            // --------------------------------

            card.addEventListener(
                "dragstart",
                function(event) {

                    if (!gameStarted) {

                        event.preventDefault();

                        return;
                    }


                    draggedItem =
                        this;


                    this.classList.add(
                        "dragging"
                    );


                    event.dataTransfer.setData(
                        "text/plain",
                        this.dataset.name
                    );


                    event.dataTransfer.effectAllowed =
                        "move";

                }
            );


            // --------------------------------
            // DESKTOP DRAG END
            // --------------------------------

            card.addEventListener(
                "dragend",
                function() {

                    this.classList.remove(
                        "dragging"
                    );


                    draggedItem =
                        null;

                }
            );


            // =================================
            // MOBILE TOUCH START
            // =================================

            card.addEventListener(
                "touchstart",
                function(event) {

                    if (!gameStarted) {
                        return;
                    }


                    touchItem =
                        this;


                    const touch =
                        event.touches[0];


                    touchStartX =
                        touch.clientX;


                    touchStartY =
                        touch.clientY;


                    this.classList.add(
                        "dragging"
                    );


                    event.preventDefault();

                },
                {
                    passive: false
                }
            );


            // =================================
            // MOBILE TOUCH MOVE
            // =================================

            card.addEventListener(
                "touchmove",
                function(event) {

                    if (
                        !gameStarted ||
                        !touchItem
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const touch =
                        event.touches[0];


                    const x =
                        touch.clientX;


                    const y =
                        touch.clientY;


                    // Find element underneath finger

                    const element =
                        document.elementFromPoint(
                            x,
                            y
                        );


                    // Find category

                    const category =
                        element
                            ? element.closest(
                                ".category"
                            )
                            : null;


                    // Remove old highlights

                    categories.forEach(
                        cat => {

                            cat.classList.remove(
                                "drag-over"
                            );

                        }
                    );


                    // Highlight category

                    if (category) {

                        category.classList.add(
                            "drag-over"
                        );

                    }

                },
                {
                    passive: false
                }
            );


            // =================================
            // MOBILE TOUCH END
            // =================================

            card.addEventListener(
                "touchend",
                function(event) {

                    if (
                        !gameStarted ||
                        !touchItem
                    ) {
                        return;
                    }


                    event.preventDefault();


                    const touch =
                        event.changedTouches[0];


                    const x =
                        touch.clientX;


                    const y =
                        touch.clientY;


                    // Find element underneath finger

                    const element =
                        document.elementFromPoint(
                            x,
                            y
                        );


                    // Find category

                    const category =
                        element
                            ? element.closest(
                                ".category"
                            )
                            : null;


                    // Remove highlights

                    categories.forEach(
                        cat => {

                            cat.classList.remove(
                                "drag-over"
                            );

                        }
                    );


                    // Drop on category

                    if (category) {

                        const selectedCategory =
                            category.dataset.category;


                        const correctCategory =
                            touchItem.dataset.answer;


                        if (
                            selectedCategory ===
                            correctCategory
                        ) {

                            correctDrop(
                                touchItem,
                                category
                            );

                        } else {

                            wrongDrop(
                                category
                            );

                        }

                    }


                    touchItem.classList.remove(
                        "dragging"
                    );


                    touchItem =
                        null;

                },
                {
                    passive: false
                }
            );


            // =================================
            // MOBILE TOUCH CANCEL
            // =================================

            card.addEventListener(
                "touchcancel",
                function() {

                    this.classList.remove(
                        "dragging"
                    );


                    touchItem =
                        null;


                    categories.forEach(
                        category => {

                            category.classList.remove(
                                "drag-over"
                            );

                        }
                    );

                }
            );

        }
    );

}


// ------------------------------------------
// CATEGORY DRAG EVENTS
// ------------------------------------------

categories.forEach(
    category => {


        // --------------------------------
        // DRAG OVER
        // --------------------------------

        category.addEventListener(
            "dragover",
            function(event) {

                if (!gameStarted) {
                    return;
                }


                event.preventDefault();


                this.classList.add(
                    "drag-over"
                );


                event.dataTransfer.dropEffect =
                    "move";

            }
        );


        // --------------------------------
        // DRAG LEAVE
        // --------------------------------

        category.addEventListener(
            "dragleave",
            function() {

                this.classList.remove(
                    "drag-over"
                );

            }
        );


        // --------------------------------
        // DROP
        // --------------------------------

        category.addEventListener(
            "drop",
            function(event) {

                event.preventDefault();


                this.classList.remove(
                    "drag-over"
                );


                if (!gameStarted) {
                    return;
                }


                if (!draggedItem) {
                    return;
                }


                const selectedCategory =
                    this.dataset.category;


                const correctCategory =
                    draggedItem.dataset.answer;


                // ----------------------------
                // CORRECT
                // ----------------------------

                if (
                    selectedCategory ===
                    correctCategory
                ) {

                    correctDrop(
                        draggedItem,
                        this
                    );

                }


                // ----------------------------
                // WRONG
                // ----------------------------

                else {

                    wrongDrop(
                        this
                    );

                }

            }
        );

    }
);


// ------------------------------------------
// CORRECT DROP
// ------------------------------------------

function correctDrop(
    item,
    category
) {

    score++;

    remaining--;


    // Update score

    scoreElement.textContent =
        score;


    remainingElement.textContent =
        remaining;


    // Feedback

    feedback.textContent =
        "✓ නිවැරදියි! " +
        item.dataset.name +
        " නිවැරදි කාණ්ඩයට එකතු කළා.";


    feedback.className =
        "feedback correct";


    // Destination

    const placedItems =
        category.querySelector(
            ".placed-items"
        );


    // Hide drop message

    const dropText =
        category.querySelector(
            ".drop-text"
        );


    if (dropText) {

        dropText.style.display =
            "none";

    }


    // Create placed item

    const placedItem =
        document.createElement(
            "div"
        );


    placedItem.className =
        "placed-item";


    placedItem.innerHTML = `

        <span class="mini-icon">
            ✓
        </span>

        <span>
            ${item.dataset.name}
        </span>

    `;


    placedItems.appendChild(
        placedItem
    );


    // Animate category

    category.style.transform =
        "scale(1.03)";


    setTimeout(
        function() {

            category.style.transform =
                "";

        },
        250
    );


    // Remove original item

    item.style.opacity =
        "0";


    item.style.transform =
        "scale(0.7)";


    setTimeout(
        function() {

            item.remove();

            draggedItem = null;

            touchItem = null;

            checkComplete();

        },
        350
    );

}


// ------------------------------------------
// WRONG DROP
// ------------------------------------------

function wrongDrop(category) {

    feedback.textContent =
        "✗ වැරදියි! නැවත උත්සාහ කරන්න.";


    feedback.className =
        "feedback wrong";


    category.classList.add(
        "wrong-drop"
    );


    setTimeout(
        function() {

            category.classList.remove(
                "wrong-drop"
            );

        },
        500
    );

}


// ------------------------------------------
// CHECK GAME COMPLETE
// ------------------------------------------

function checkComplete() {

    if (remaining === 0) {


        // Stop timer

        stopTimer();


        // Final score

        finalScore.textContent =
            score +
            " / " +
            itemsData.length;


        // Final time

        finalTime.textContent =
            formatTime(
                elapsedSeconds
            );


        // Show result

        result.classList.remove(
            "hidden"
        );


        setTimeout(
            function() {

                result.scrollIntoView({

                    behavior: "smooth",

                    block: "center"

                });

            },
            300
        );

    }

}


// ------------------------------------------
// START BUTTON
// ------------------------------------------

startButton.addEventListener(
    "click",
    function() {

        if (gameStarted) {
            return;
        }


        gameStarted =
            true;


        startButton.textContent =
            "▶️ ක්‍රීඩාව ක්‍රියාත්මකයි";


        startButton.disabled =
            true;


        // Enable all items

        document
            .querySelectorAll(
                ".item-card"
            )
            .forEach(
                card => {

                    card.draggable =
                        true;

                }
            );


        // Start timer

        startTimer();


        feedback.textContent =
            "🎯 ක්‍රීඩාව ආරම්භ විය!";


        feedback.className =
            "feedback correct";

    }
);


// ------------------------------------------
// RESTART GAME
// ------------------------------------------

restartButton.addEventListener(
    "click",
    restartGame
);


function restartGame() {

    // Stop old timer

    stopTimer();


    // Reset variables

    score = 0;

    remaining =
        itemsData.length;

    elapsedSeconds =
        0;

    gameStarted =
        false;

    draggedItem =
        null;

    touchItem =
        null;


    // Reset display

    scoreElement.textContent =
        "0";


    remainingElement.textContent =
        remaining;


    timerElement.textContent =
        "00:00";


    finalTime.textContent =
        "00:00";


    feedback.textContent =
        "";


    feedback.className =
        "feedback";


    // Hide result

    result.classList.add(
        "hidden"
    );


    // Reset start button

    startButton.disabled =
        false;


    startButton.textContent =
        "▶️ ක්‍රීඩාව ආරම්භ කරන්න";


    // Clear categories

    categories.forEach(
        category => {

            const placedItems =
                category.querySelector(
                    ".placed-items"
                );


            placedItems.innerHTML =
                "";


            const dropText =
                category.querySelector(
                    ".drop-text"
                );


            if (dropText) {

                dropText.style.display =
                    "block";

            }


            category.classList.remove(
                "wrong-drop"
            );


            category.classList.remove(
                "drag-over"
            );

        }
    );


    // Load shuffled items

    loadItems();


    // Scroll top

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ------------------------------------------
// START GAME
// ------------------------------------------

loadItems();