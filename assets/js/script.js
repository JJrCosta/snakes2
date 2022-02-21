window.onload = function(){

    var stage = document.getElementById('stage');
    var context = stage.getContext('2d');
    document.addEventListener("keydown", keyPush);

    setInterval(game, 80); //Define um intervalo para uma função ser chamada varias vezes com o intervalo definido.

    const vel = 1;  //velocidade do jogo (movimentação da cobrinha)

    var vx = vy = 0;  //velocidade da cobrinha
    var px = py = 10; //posição inicial
    var tp = 20;      //tamanho da peça
    var qp = 30;      //quantidade de peças
    var ax = ay = 15  //posção inicial da maçã

    var trail = [];//rastro da cobra ou tamanho relativo
    var tail = 5; //cauda ou tamanho inicial

    //Função que transforma a tela em loop
    function game() {
        px += vx;
        py += vy;
        if(px < 0) {
            px = qp - 1;
        }
        if (px > qp - 1) {
            px = 0;
        }
        if(py < 0) {
            py = qp - 1;
        }
        if(py > qp - 1) {
            py = 0;
        }

        //Pinta o Stage
        context.fillStyle = "black";
        context.fillRect(0,0, stage.width, stage.height);  

        //Pinta as maçãs na tela
        context.fillStyle = "red";
        context.fillRect(ax*tp, ay*tp, tp, tp);

        //Pinta a cobra
        context.fillStyle = "gray";
        for (var i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x*tp, trail[i].y*tp, tp, tp);
            //confere a colisão da cobrinha com ela mesma
            if(trail[i].x == px && trail[i].y == py)
            {
                vx = vy = 0;
                tail = 5;
            }
        }

        // cria um objeto JASON para desenhar o rastro na tela e verificar se o comprimento dele não está ultrapassando o comprimento da cauda.
        trail.push({x:px,y:py})
        while (trail.length > tail) {
            trail.shift();
        }

        // aumeta o tamanho da cobrinha a cada maçã capturada e cria um novo ojeto randomicamente em um lugar do tabuleiro.
        if (ax==px && ay==py){
            tail++;
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp);
        }
    }

    // define os controles do jogo
    function keyPush(event){
        switch (event.keyCode) {
            case 37: //left
                vx = -vel;
                vy = 0;
                break;
            case 38: //up
                vx = 0;
                vy = -vel;
                break;
            case 39: //right
                vx = vel;
                vy = 0;
                break;
            case 40: //down
                vx = 0;
                vy = vel;
                break;
            default:
                break;
        }

    }

    


}