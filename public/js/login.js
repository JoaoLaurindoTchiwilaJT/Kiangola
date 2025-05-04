
function logar(event){
    event.preventDefault();
    // alert(`Dados recebidos ${email}  e ${password}`);
    const dataUser = {
        email : document.querySelector("#emai").value,
        password : document.querySelector("#pass").value
    };

    sendToDatabases(dataUser);
}

function sendToDatabases(dataUser){
    fetch(`${api}/kiangola/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataUser)
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === "Logado com sucesso!") {
            // alert("Logado!")
            window.location.assign("../public/admin.html")
        } else {
            document.getElementById("resposta").innerText = data.message;
            document.getElementById("resposta").style.color = "red";
            document.getElementById("resposta").style.display = "flex";
            // alert("Dados invalidos! " + data.message)
        }
    })
    .catch((error) => {
        console.error('Error ao fazer login: ', error.message);
        alert('Erro ao fazer login!' + error);
    });

}