

/* ==========================================
   DATA
========================================== */

let balance =
    Number(localStorage.getItem("demoBalance")) || 5250;


let transactions =
    JSON.parse(
        localStorage.getItem("demoTransactions")
    ) || [

        {
            name:"Rahul",
            amount:500,
            type:"Sent",
            date:"Today"
        },

        {
            name:"Mobile Recharge",
            amount:299,
            type:"Recharge",
            date:"Yesterday"
        }

    ];

console.log(transactions)

let selectedPlan = 0;


let selectedBank = "";

// console.log(selectedBank)



/* ==========================================
   INITIAL LOAD
========================================== */

updateBalance();

displayRecentTransactions();


/* ==========================================
   BALANCE
========================================== */

function updateBalance(){

    document.getElementById("homeBalance").innerText =
        "₹" + balance.toLocaleString("en-IN"); //indian num format

    localStorage.setItem(
        "demoBalance",
        balance
    );
}


function addMoney(){

    balance += 1000;

    updateBalance();

    alert(
        "₹1,000  money added!"
    );
}


/* ==========================================
   PAGE SYSTEM
========================================== */

function hidePages(){

    document
        .querySelectorAll(".page")
        .forEach(function(page){

            page.classList.remove("active");

        });

}


function showPage(id){

    hidePages();

    document
        .getElementById(id)
        .classList.add("active");

}


function showHome(){

    showPage("homePage");

    updateBalance();

    displayRecentTransactions();

}


function showSendPage(){

    showPage("sendPage");

}


function showHistoryPage(){

    showPage("historyPage");

    displayAllTransactions();

}


function showRechargePage(){

    showPage("rechargePage");

}


function showBalancePage(){

    showPage("balancePage");

    document.getElementById(
        "accountResult"
    ).style.display = "none";

}


function showProfile(){

    showPage("profilePage");

}


function showComingSoon(){

    alert(
        "This feature is coming soon!"
    );

}


/* SEND MONEY */

function sendContinue(){

    let mobile =
        document.getElementById(
            "sendMobile"
        ).value;

    let amount =
        Number(
            document.getElementById(
                "sendAmount"
            ).value
        );

    let error =
        document.getElementById(
            "sendError"
        );


    if(mobile.length !== 10){

        error.innerText =
            "Enter a valid 10-digit mobile number.";

        error.style.display = "block";

        return;
    }


    if(amount <= 0){

        error.innerText =
            "Enter a valid amount.";

        error.style.display = "block";

        return;
    }


    if(amount > balance){

        error.innerText =
            "Insufficient  balance.";

        error.style.display = "block";

        return;
    }


    error.style.display = "none";


    showPage("pinPage");

}


function completePayment(){

    let pin =
        document.getElementById(
            "sendPin"
        ).value;


    if(pin !== "1234"){

        document.getElementById(
            "pinError"
        ).style.display = "block";

        return;

    }


    let mobile =
        document.getElementById(
            "sendMobile"
        ).value;


    let amount =
        Number(
            document.getElementById(
                "sendAmount"
            ).value
        );


    balance -= amount;

    updateBalance();


    transactions.unshift({

        name:
            "****" +
            mobile.slice(-4),

        amount:
            amount,

        type:
            "Sent",

        date:
            "Just now"

    });


    saveTransactions();

//pament success messege
    document.getElementById(
        "paymentDetails"
    ).innerHTML =

        "₹" +
        amount.toLocaleString("en-IN") +

        "<br><br>" +

        "Sent to ****" +
        mobile.slice(-4);


    showPage(
        "paymentSuccessPage"
    );


    document.getElementById(
        "sendMobile"
    ).value = "";


    document.getElementById(
        "sendAmount"
    ).value = "";


    document.getElementById(
        "sendPin"
    ).value = "";

}


/* ==========================================
   RECHARGE
========================================== */

function selectPlan(amount){

    selectedPlan = amount;

    document.getElementById(
        "selectedPlan"
    ).value =

        "₹" +
        amount +
        " selected";

}


function startRecharge(){

    let mobile =
        document.getElementById(
            "rechargeMobile"
        ).value;


    let operator =
        document.getElementById(
            "rechargeOperator"
        ).value;


    let error =
        document.getElementById(
            "rechargeError"
        );


    if(mobile.length !== 10){

        error.innerText =
            "Enter a valid 10-digit mobile number.";

        error.style.display =
            "block";

        return;

    }


    if(operator === ""){

        error.innerText =
            "Please select an operator.";

        error.style.display =
            "block";

        return;

    }


    if(selectedPlan === 0){

        error.innerText =
            "Please select a recharge plan.";

        error.style.display =
            "block";

        return;

    }


    if(selectedPlan > balance){

        error.innerText =
            "Insufficient balance.";

        error.style.display =
            "block";

        return;

    }


    error.style.display =
        "none";


    balance -= selectedPlan;

    updateBalance();


    transactions.unshift({

        name:
            operator +
            " Recharge",

        amount:
            selectedPlan,

        type:
            "Recharge",

        date:
            "Just now"

    });


    saveTransactions();


    document.getElementById(
        "rechargeDetails"
    ).innerHTML =

        "Mobile: ****" +
        mobile.slice(-4) +

        "<br><br>" +

        "Operator: " +
        operator +

        "<br><br>" +

        "Amount: ₹" +
        selectedPlan;


    showPage(
        "rechargeSuccessPage"
    );


    document.getElementById(
        "rechargeMobile"
    ).value = "";


    document.getElementById(
        "rechargeOperator"
    ).value = "";


    document.getElementById(
        "selectedPlan"
    ).value = "";


    selectedPlan = 0;

}


/* ==========================================
   BANK ACCOUNT BALANCE
========================================== */

function selectBank(bank){

    selectedBank = bank;


    document
        .querySelectorAll(".bank-card")
        .forEach(function(card){

            card.classList.remove(
                "selected"
            );

        });


    document
        .getElementById(bank)
        .classList.add(
            "selected"
        );

}


function checkBalance(){

    let pin =
        document.getElementById(
            "balancePin"
        ).value;


    let error =
        document.getElementById(
            "balanceError"
        );


    if(selectedBank === ""){

        error.innerText =
            "Please select a bank account.";

        error.style.display =
            "block";

        return;

    }


    if(pin !== "1234"){

        error.innerText =
            "Incorrect PIN. Demo PIN is 1234.";

        error.style.display =
            "block";

        return;

    }


    error.style.display =
        "none";


    let bankName = "";
    let account = "";


    if(selectedBank === "bank1"){

        bankName =
            "State Bank";

        account =
            "•••• 4521";

    }


    if(selectedBank === "bank2"){

        bankName =
            "HDFC Bank";

        account =
            "•••• 7812";

    }


    // if(selectedBank === "bank3"){

    //     bankName =
    //         "ICICI Bank";

    //     account =
    //         "•••• 9634";

    // }


    document.getElementById(
        "resultBank"
    ).innerText =
        bankName;


    document.getElementById(
        "resultAccount"
    ).innerText =
        account;


    document.getElementById(
        "accountBalance"
    ).innerText =

        "₹" + balance.toLocaleString("en-IN");


    document.getElementById(
        "accountResult"
    ).style.display =
        "block";

}


/* ==========================================
   TRANSACTIONS
========================================== */

function saveTransactions(){

    localStorage.setItem(
        "demoTransactions",
        JSON.stringify(
            transactions
        )
    );

}


function transactionHTML(t){

    let icon =
        t.type === "Recharge"
        ? "📱"
        : "💸";


    return `

        <div class="transaction">

            <div class="transaction-icon">
                ${icon}
            </div>

            <div class="transaction-info">

                <h4>
                    ${t.name}
                </h4>

                <p>
                    ${t.date}
                </p>

                <span class="success">
                    ✓ Successful
                </span>

            </div>

            <div class="amount">
                -₹${Number(t.amount)
                    .toLocaleString("en-IN")}
            </div>

        </div>

    `;

}


function displayRecentTransactions(){

    let box =
        document.getElementById(
            "recentTransactions"
        );


    box.innerHTML = "";


    if(transactions.length === 0){

        box.innerHTML =
            '<div class="empty">No transactions yet</div>';

        return;

    }


    transactions
        .slice(0,4)
        .forEach(function(t){

            box.innerHTML +=
                transactionHTML(t);

        });

}


function displayAllTransactions(){

    let box =
        document.getElementById(
            "allTransactions"
        );


    box.innerHTML = "";


    if(transactions.length === 0){

        box.innerHTML =
            '<div class="empty">No transactions yet</div>';

        return;

    }


    transactions.forEach(
        function(t){

            box.innerHTML +=
                transactionHTML(t);

        }
    );

}

