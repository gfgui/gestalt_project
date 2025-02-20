//Tela inicial

class Button {
  constructor(xpos, ypos, img){
    this.xpos = xpos,
    this.ypos = ypos,
    this.img = img,
    this.ligado = 0,
    this.tam = 0
  }
  ligar(){
    this.ligado = 1;
    this.tam = 100;
  }
  hover(){
    if(this.ligado == 0){
      if(dist(mouseX, mouseY,  this.xpos, this.ypos) < 25){
        if( this.tam < 100){
          this.tam+=5;
        }
        image(this.img, this.xpos-this.tam/2, this.ypos-this.tam*1.3/2, this.tam, this.tam*1.3)
        return 1
      } else{
        if( this.tam > 5){
          this.tam-=5;
          image(this.img, this.xpos-this.tam/2, this.ypos-this.tam*1.3/2, this.tam, this.tam*1.3)
        }
        else{
          this.tam = 0;
          noStroke()
          fill(255)
          circle(this.xpos, this.ypos, 50)
        }
        return 0
      }
    } else{
      image(this.img, this.xpos-this.tam/2, this.ypos-this.tam*1.3/2, this.tam, this.tam*1.3)
      return 0;
    }
  }
  isClicked(){
    if(dist(mouseX, mouseY,  this.xpos, this.ypos) < 25){
      return true
    }
    else{
      return false
    }
  }
}

class Buttons {
  constructor(){
    this.buttons = []
  }
  newButton(xpos, ypos, img){
    let b = new Button(xpos, ypos, img)
    this.buttons.push(b)
  }
  verifyhover(){
    let c = 0;
    for (let i = 0; i < this.buttons.length; i++)
      c += this.buttons[i].hover()

    if(c == 0)
      cursor('default')
    else
      cursor('pointer')
    
  }
  verifyclicked(){
    for (let i = 0; i < this.buttons.length; i++)
      if(this.buttons[i].isClicked() && this.buttons[i].ligado == 0){
        tela = i+1;
        cursor('default')
      }
  }
  ligar(b){
    this.buttons[b-1].ligar()
  }
  verifyAllCompleted(){
    let resp = 1
    for (let i = 0; i < this.buttons.length; i++)
      if(this.buttons[i].ligado == 0)
        resp = 0;

    return resp
  }
}

let final_button = {
  xpos : 640,
  ypos : 560,
  ligado : 0,
  tam : 0,
  hover(){
      if(dist(mouseX, mouseY,  this.xpos, this.ypos) < 25){
        if( this.tam < 200){
          this.tam+=2;
        }

          stroke(100, 100, 200)
          strokeWeight(30)
          line(150, 360, 150, 360+this.tam)
          line(150, 360, 150, 360-this.tam)
          line(1130, 360, 1130, 360+this.tam)
          line(1130, 360, 1130, 360-this.tam)
          line(640, 160, 640+(490*(this.tam/200)), 160)
          line(640, 160, 640-(490*(this.tam/200)), 160)
          line(640, 560, 640+(490*(this.tam/200)), 560)
          line(640, 560, 640-(490*(this.tam/200)), 560)
          stroke(1)
        cursor('pointer')
        return 1
      } else{
        if( this.tam > 5){
          this.tam-=2;
          
          stroke(100, 100, 200)
          strokeWeight(30)
          line(150, 360, 150, 360+this.tam)
          line(150, 360, 150, 360-this.tam)
          line(1130, 360, 1130, 360+this.tam)
          line(1130, 360, 1130, 360-this.tam)
          line(640, 160, 640+(490*(this.tam/200)), 160)
          line(640, 160, 640-(490*(this.tam/200)), 160)
          line(640, 560, 640+(490*(this.tam/200)), 560)
          line(640, 560, 640-(490*(this.tam/200)), 560)
          stroke(1)
        }
        else{
          this.tam = 0;
          noStroke()
          fill(255)
          circle(this.xpos, this.ypos, 50)
        }
        cursor('default')
        return 0
    } 
  },
  isClicked(){
    if(dist(mouseX, mouseY,  this.xpos, this.ypos) < 25){
      return true
    }
    else{
      return false
    }
  }
}

let lista_buttons = new Buttons()

// Proximidade

let bloco = {
  xpos : 640,
  ypos : 100,
  draw_bloco(){
    noStroke()
    fill(150, 150, 255)
    rect(this.xpos - 40 +2, this.ypos - 40 + 2, 36, 36)
    rect(this.xpos - 40 +2, this.ypos + 2, 36, 36)
    rect(this.xpos +2, this.ypos -40 + 2, 36, 36)
    rect(this.xpos +2, this.ypos + 2, 36, 36)
  }
}

//Similaradiade

function calc_color(ind){
  switch (ind) {
    case 1:
      fill(255, 255, 0)
      break;
    case 2:
      fill(0, 255, 0)
      break;
    case 3:
      fill(0, 255, 255)
      break;
    case 4:
      fill(255, 0, 255)
      break;
  }
}

class Similar {
  constructor(xpos, ypos, ind_color){
    this.xpos = xpos,
    this.ypos = ypos,
    this.ind_color = ind_color,
    this.buttonx = xpos + 80,
    this.buttony = ypos + 320
  }
  draw_similar(){
    let bx = this.xpos, by = this.ypos, tam = 80
    calc_color(this.ind_color)
    for(let i = 0; i < 2; i++)
      for(let j = 0; j < 3; j++){
        rect(bx +80*i +5, by +80*j +5, 70, 70)
    }
  }
  draw_button_similar(){
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 60){
      fill(255, 200, 200)
      circle(this.buttonx, this.buttony, 120)
      return 1
    } else {
      fill(255, 230, 230)
      circle(this.buttonx, this.buttony, 120)
      return 0
    }
  }
  change_color(){
    this.ind_color = (this.ind_color%4)+1
  }
  isClicked(){
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 60){
      return 1
    } else {
      return 0
    }
  }
}

class Similares {
  constructor(){
    this.similares = []
  }
  newSimilar(xpos, ypos, ind_color){
    let s = new Similar(xpos, ypos, ind_color)
    this.similares.push(s)
  }
  showAll(){
    let c = 0;
    for (let i = 0; i < this.similares.length; i++){
      this.similares[i].draw_similar()
      c += this.similares[i].draw_button_similar()
    }
    if( c == 0 )
      cursor('default')
    else
      cursor('pointer')
  }
  change_color(ind){
    this.similares[i].change_color()
  }
  verifyclicked(){
    for (let i = 0; i < this.similares.length; i++)
      if(this.similares[i].isClicked()){
        this.similares[i].change_color()
      }
  }
  verifyEquality(){
    let resp = 1
    for (let i = 1; i < this.similares.length; i++)
      if(this.similares[i].ind_color != this.similares[i-1].ind_color)
        resp = 0
    return resp
  }
}

let lista_similares = new Similares()
lista_similares.newSimilar(320, 200, 1)
lista_similares.newSimilar(480, 200, 2)
lista_similares.newSimilar(640, 200, 3)
lista_similares.newSimilar(800, 200, 4)

//Continuidade

class Bola {
  constructor(xpos, ypos, continuidade, active){
    this.xpos = xpos,
    this.ypos = ypos,
    this.continuidade = continuidade,
    this.active = active
  }
  draw_bola(){
    stroke(200)
    fill(200, 140, 240)
    
    if(bolas_completed)
      fill( 250, 140, 100)

    if(this.active == 0)
      noFill();

    circle(this.xpos, this.ypos, 100)

    if(dist(mouseX, mouseY, this.xpos, this.ypos) < 50)
      return 1
    else 
      return 0
  }
  clicar(){
    if(this.active == 0)
      this.active = 1
    else 
      this.active=0
  }
  isClicked(){
    if(dist(mouseX, mouseY, this.xpos, this.ypos) < 50){
      return 1
    } else {
      return 0
    }
  }
}

class Bolas {
  constructor(){
    this.bolas = []
  }
  newBola(xpos, ypos, continuidade, active){
    let b = new Bola(xpos, ypos, continuidade, active)
    this.bolas.push(b)
  }
  showAll(){
    let c = 0;
    for (let i = 0; i < this.bolas.length; i++){
      c += this.bolas[i].draw_bola()
    }
    if( c == 0 )
      cursor('default')
    else
      cursor('pointer')
  }
  verifyclicked(){
    for (let i = 0; i < this.bolas.length; i++)
      if(this.bolas[i].isClicked()){
        this.bolas[i].clicar()
      }
  }
  verifyCompleted(){
    let resp = 1
    for (let i = 0; i < this.bolas.length; i++)
      if((this.bolas[i].active == 1 && this.bolas[i].continuidade == 0) || (this.bolas[i].active == 0 && this.bolas[i].continuidade == 1))
        resp = 0

    return resp
  }
}

let lista_bolas = new Bolas()
let bolas_completed = 0;


lista_bolas.newBola( 100, 650, 1, 1) 
lista_bolas.newBola( 250, 560, 1, 0) 
lista_bolas.newBola( 400, 470, 1, 0) 
lista_bolas.newBola( 550, 380, 1, 1) 
lista_bolas.newBola( 700, 290, 1, 0) 
lista_bolas.newBola( 850, 200, 1, 1) 
lista_bolas.newBola( 1000, 110, 1, 0)

lista_bolas.newBola( 812, 590, 0, 0) 
lista_bolas.newBola( 1025, 456, 0, 1) 
lista_bolas.newBola( 513, 226, 0, 0) 
lista_bolas.newBola( 224, 255, 0, 1) 

//Pregnancia

class Circulo {
  constructor(xpos, ypos, angle){
    this.xpos = xpos,
    this.ypos = ypos,
    this.angle = angle
  }
  draw_circulo(){
    noStroke();
    fill(200, 140, 240)

    circle(this.xpos, this.ypos, 120)

    stroke(255, 200, 230)
    strokeWeight(12)
    line(this.xpos, this.ypos, this.xpos+60*cos((this.angle*PI/4)), this.ypos+60*sin((this.angle*PI/4)))
    line(this.xpos, this.ypos, this.xpos+60*cos(((this.angle+1)*PI/4)), this.ypos+60*sin(((this.angle+1)*PI/4)))

    if(dist(mouseX, mouseY, this.xpos, this.ypos) < 60)
      return 1
    else 
      return 0
  }
  clicar(){
    this.angle = (this.angle%8)+1
  }
  isClicked(){
    if(dist(mouseX, mouseY, this.xpos, this.ypos) < 60){
      return 1
    } else {
      return 0
    }
  }
}

class Circulos{
  constructor() {
    this.circulos = []
  }
  newCirculo(xpos, ypos, angle){
    let c = new Circulo(xpos, ypos, angle)
    this.circulos.push(c)
  }
  showAll(){

    //basic circle

    fill(240, 140, 2400)
    circle(640, 360, 120)
    stroke(255, 200, 230)
    strokeWeight(12)
    line(640, 360, 640+60*cos((1*PI/4)), 360+60*sin((1*PI/4)))
    line(640, 360, 640+60*cos(((7)*PI/4)), 360+60*sin(((7)*PI/4)))
    line(640, 360, 640+60*cos((3*PI/4)), 360+60*sin((3*PI/4)))
    line(640, 360, 640+60*cos(((5)*PI/4)), 360+60*sin(((5)*PI/4)))
    strokeWeight(1)

    let c = 0;
    for (let i = 0; i < this.circulos.length; i++){
      c += this.circulos[i].draw_circulo()
    }
    if( c == 0 )
      cursor('default')
    else
      cursor('pointer')
  }
  verifyclicked(){
    for (let i = 0; i < this.circulos.length; i++)
      if(this.circulos[i].isClicked()){
        this.circulos[i].clicar()
      }
  }
  verifyCompleted(){
    let resp = 0
    if( this.circulos[0].angle == 6 && this.circulos[1].angle == 1 && this.circulos[2].angle == 5 && this.circulos[3].angle == 2)
        resp = 1

    return resp
  }
}

let lista_circulos = new Circulos()

lista_circulos.newCirculo(640-200, 360+200, 4)
lista_circulos.newCirculo(640-200, 360-200, 4)
lista_circulos.newCirculo(640+200, 360+200, 7)
lista_circulos.newCirculo(640+200, 360-200, 7)

//Fechamento

class Barra {
  constructor(xpos, ypos, buttonx, buttony, angle){
    this.xpos = xpos,
    this.ypos = ypos,
    this.buttonx = buttonx,
    this.buttony = buttony,
    this.angle = angle
  }
  draw_barra(){

    stroke(140, 100, 100)
    strokeWeight(8)
    line(this.xpos, this.ypos, this.xpos+50*cos((this.angle*PI/2)), this.ypos+50*sin((this.angle*PI/2)))
    line(this.xpos, this.ypos, this.xpos+50*cos(((this.angle+2)*PI/2)), this.ypos+50*sin(((this.angle+2)*PI/2)))

    stroke(1)

    if(dist(mouseX, mouseY, this.xpos, this.ypos) < 60)
      return 1
    else 
      return 0
  }
  draw_button_barra(){
    noStroke()
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 50){
      fill(255, 200, 200)
      circle(this.buttonx, this.buttony, 100)
      return 1
    } else {
      fill(255, 230, 230)
      circle(this.buttonx, this.buttony, 100)
      return 0
    }
  }
  clicar(){
    this.angle = (this.angle%2)+1
  }
  isClicked(){
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 50){
      return 1
    } else {
      return 0
    }
  }
}

class Barras {
  constructor(){
    this.barras = []
  }
  newBarra(xpos, ypos, buttonx, buttony, angle){
    let b = new Barra(xpos, ypos, buttonx, buttony, angle)
    this.barras.push(b)
  }
  showAll(){
    let c = 0;
    for (let i = 0; i < this.barras.length; i++){
      this.barras[i].draw_barra()
      c += this.barras[i].draw_button_barra()
    }
    if( c == 0 )
      cursor('default')
    else
      cursor('pointer')
  }
  verifyclicked(){
    for (let i = 0; i < this.barras.length; i++)
      if(this.barras[i].isClicked()){
        this.barras[i].clicar()
      }
  }
  verifyCompleted(){
    let resp = 0
    if( this.barras[0].angle == 2 &&
      this.barras[1].angle == 2 &&
      this.barras[2].angle == 1 &&
      this.barras[3].angle == 1 &&
      this.barras[4].angle == 2 &&
      this.barras[5].angle == 2 &&
      this.barras[6].angle == 1 &&
      this.barras[7].angle == 1
      )
      resp = 1

    return resp
  }
}

let lista_barras = new Barras()

lista_barras.newBarra( 490, 160 ,220, 144*1, 1)
lista_barras.newBarra( 690, 160 ,220, 144*2, 1)
lista_barras.newBarra( 840, 210 ,220, 144*3, 1)
lista_barras.newBarra( 840, 410 ,220, 144*4, 1)
lista_barras.newBarra( 790, 560 ,1060, 144*1, 1)
lista_barras.newBarra( 590, 560 ,1060, 144*2, 1)
lista_barras.newBarra( 440, 510 ,1060, 144*3, 1)
lista_barras.newBarra( 440, 310 ,1060, 144*4, 1)

//Segregacao

function draw_quadrado_black(xpos, ypos, nivel){
  stroke(140, 200, 230)
  fill(nivel*70+45)
  rect(xpos-50, ypos-50, 100, 100)
  noStroke()
  fill(0)
  circle(xpos, ypos, 60)
}

class Quadrado {
  constructor(xpos, ypos, buttonx, buttony, nivel){
    this.xpos = xpos,
    this.ypos = ypos,
    this.buttonx = buttonx,
    this.buttony = buttony,
    this.nivel = nivel
  }
  draw_quadrado(){


    fill(this.nivel*70)

    if(quadrados_completed == 1){
      stroke(100, 200, 250)
      strokeWeight(10)
    }

    rect(this.xpos-50, this.ypos-50, 100, 100)

    strokeWeight(1)
    noStroke()
    fill(255)
    circle(this.xpos, this.ypos, 60)

  }
  draw_button_quadrado(){
    noStroke()
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 25){
      fill(255, 200, 200)
      circle(this.buttonx, this.buttony, 50)
      return 1
    } else {
      fill(255, 230, 230)
      circle(this.buttonx, this.buttony, 50)
      return 0
    }
  }
  clicar(){
    if(quadrados_completed == 0)
      this.nivel = (this.nivel+3)%4
  }
  isClicked(){
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 25){
      return 1
    } else {
      return 0
    }
  }
}

class Quadrados {
  constructor(){
    this.quadrados = []
  }
  newQuadrado(xpos, ypos, buttonx, buttony, nivel){
    let q = new Quadrado(xpos, ypos, buttonx, buttony, nivel)
    this.quadrados.push(q)
  }
  showAll(){
    let c = 0;
    for (let i = 0; i < this.quadrados.length; i++){
      this.quadrados[i].draw_quadrado()
      c += this.quadrados[i].draw_button_quadrado()
    }
    if( c == 0 )
      cursor('default')
    else
      cursor('pointer')
  }
  verifyclicked(){
    for (let i = 0; i < this.quadrados.length; i++)
      if(this.quadrados[i].isClicked()){
        this.quadrados[i].clicar()
      }
  }
  verifyCompleted(){
    let resp = 0
    if( this.quadrados[0].nivel == 0 &&
      this.quadrados[1].nivel == 1 &&
      this.quadrados[2].nivel == 2 &&
      this.quadrados[3].nivel == 3
      ){
        quadrados_completed = 1
        resp = 1
      }

    return resp
  }
}

let lista_quadrados = new Quadrados()
let quadrados_completed = 0;

lista_quadrados.newQuadrado(425, 360, 425, 450, 3)
lista_quadrados.newQuadrado(575, 360, 575, 450, 2)
lista_quadrados.newQuadrado(725, 360, 725, 450, 1)
lista_quadrados.newQuadrado(875, 360, 875, 450, 0)

//Unificacao

let basex = [-1, 1, 1, -1]
let basey = [-1, -1, 1, 1]

class Unidade {
  constructor(xpos, ypos, buttonx, buttony, posicao){
    this.xpos = xpos,
    this.ypos = ypos,
    this.buttonx = buttonx,
    this.buttony = buttony,
    this.posicao = posicao
  }
  draw_unidade(){


    fill(100, 200, 180)
    noStroke()

    if(unidades_completed == 1){
      stroke(200, 160, 140)
      strokeWeight(5)
    }

    rect(this.xpos-50+50*basex[this.posicao]+3, this.ypos-50+50*basey[this.posicao]+3, 96, 96)
    strokeWeight(1)
  }
  draw_button_unidade(){
    noStroke()
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 25){
      fill(255, 200, 200)
      circle(this.buttonx, this.buttony, 50)
      return 1
    } else {
      fill(255, 230, 230)
      circle(this.buttonx, this.buttony, 50)
      return 0
    }
  }
  clicar(){
    if(unidades_completed == 0)
      this.posicao = (this.posicao+3)%4
  }
  isClicked(){
    if(dist(mouseX, mouseY, this.buttonx, this.buttony) < 25){
      return 1
    } else {
      return 0
    }
  }
}

class Unidades {
  constructor(){
    this.unidades = []
  }
  newUnidade(xpos, ypos, buttonx, buttony, nivel){
    let q = new Unidade(xpos, ypos, buttonx, buttony, nivel)
    this.unidades.push(q)
  }
  showAll(){
    let c = 0;
    for (let i = 0; i < this.unidades.length; i++){
      this.unidades[i].draw_unidade()
      c += this.unidades[i].draw_button_unidade()
    }
    if( c == 0 )
      cursor('default')
    else
      cursor('pointer')
  }
  verifyclicked(){
    for (let i = 0; i < this.unidades.length; i++)
      if(this.unidades[i].isClicked()){
        this.unidades[i].clicar()
      }
  }
  verifyCompleted(){
    
    let resp = 0
    if( this.unidades[0].posicao == 2 &&
      this.unidades[1].posicao == 3 &&
      this.unidades[2].posicao == 0 &&
      this.unidades[3].posicao == 1
      ){
        unidades_completed = 1
        resp = 1
      }

    return resp
  }
}

let lista_unidades = new Unidades()
let unidades_completed = 0;

lista_unidades.newUnidade(640+100*basex[0], 250+100*basey[0], 425, 650, 3)
lista_unidades.newUnidade(640+100*basex[1], 250+100*basey[1], 575, 650, 2)
lista_unidades.newUnidade(640+100*basex[2], 250+100*basey[2], 725, 650, 1)
lista_unidades.newUnidade(640+100*basex[3], 250+100*basey[3], 875, 650, 0)

//Geral

function draw_sub_tela(){
  background(0);
  if(tela == 1){
    image(slide_1, 0, 0, 1280, 720)
  }
  if(tela == 2){
    image(slide_2, 0, 0, 1280, 720)
  }
  if(tela == 3){
    image(slide_3, 0, 0, 1280, 720)
  }
  if(tela == 4){
    image(slide_4, 0, 0, 1280, 720)
  }
  if(tela == 5){
    image(slide_5, 0, 0, 1280, 720)
  }
  if(tela == 6){
    image(slide_6, 0, 0, 1280, 720)
  }
  if(tela == 7){
    image(slide_7, 0, 0, 1280, 720)
  }
  if(tela == 8){
    image(slide_8, 0, 0, 1280, 720)
  }
  if(tela == 9){
    image(slide_9, 0, 0, 1280, 720)
  }
  if(botao_menu.verifyhover()){
    botao_menu.draw_hover_botao();
    cursor('pointer')
  } else{
    botao_menu.draw_botao();
    cursor('default')
  }
}

let animation_1 = 0

let botao_menu = {
  xpos : 0,
  ypos : 0,
  l : 150,
  a : 40,
  draw_botao(){
    fill(100, 200, 200)
    rect(this.xpos, this.ypos, this.l, this.a)
    fill(0); // Cor do texto (preto)
    textSize(20); // Tamanho do texto
    textAlign(CENTER, CENTER); // Alinhamento do texto no centro do botão
    text("VOLTAR", this.xpos + this.l / 2, this.ypos + this.a / 2);
    
  },
  draw_hover_botao(){
    fill(200)
    rect(this.xpos, this.ypos, this.l, this.a)
    fill(0); // Cor do texto (preto)
    textSize(20); // Tamanho do texto
    textAlign(CENTER, CENTER); // Alinhamento do texto no centro do botão
    text("VOLTAR", this.xpos + this.l / 2, this.ypos + this.a / 2);
  }, 
  verifyhover(){
    if(mouseX > this.xpos && mouseX < this.xpos+this.l && mouseY > this.ypos && mouseY < this.ypos+this.a)
      return true
    else 
      return false
  }
}

let tela = 0
let sub_tela = 0
let g_intro
let e_intro
let s_intro
let t_intro
let a_intro
let l_intro
let t2_intro

function preload() {
  g_intro = loadImage('images/G.png')
  e_intro = loadImage('images/E.png')
  s_intro = loadImage('images/S.png')
  t_intro = loadImage('images/T.png')
  a_intro = loadImage('images/A.png')
  l_intro = loadImage('images/L.png')
  t2_intro = loadImage('images/T2.png')

  slide_1 = loadImage('images/slides/2.jpg')
  slide_2 = loadImage('images/slides/4.jpg')
  slide_3 = loadImage('images/slides/3.jpg')
  slide_4 = loadImage('images/slides/1.jpg')
  slide_5 = loadImage('images/slides/5.jpg')
  slide_6 = loadImage('images/slides/8.jpg')
  slide_7 = loadImage('images/slides/7.jpg')
  slide_8 = loadImage('images/slides/6.jpg')
  slide_9 = loadImage('images/slides/9.jpg')
}

function setup() {
  createCanvas(1280, 720);

  lista_buttons.newButton(340, 360, g_intro)
  lista_buttons.newButton(440, 360, e_intro)
  lista_buttons.newButton(540, 360, s_intro)
  lista_buttons.newButton(640, 360, t_intro)
  lista_buttons.newButton(740, 360, a_intro)
  lista_buttons.newButton(840, 360, l_intro)
  lista_buttons.newButton(940, 360, t2_intro)
}

function draw() {

  if(tela == 0){
    background(230, 230, 255)
    lista_buttons.verifyhover()
    if(lista_buttons.verifyAllCompleted()){
      final_button.hover()
    }
  } 
  
  //Proximidade
  else if(tela == 1){
      if(sub_tela == 0){
        if(animation_1 == 0){

        
          background(255, 200, 230)

          let bx = 440, by = 320 

          for(let i = 0; i < 10; i++)
            for(let j = 0; j < 10; j++){
              noStroke()
              fill(150)

              if(!(( i==8 && j==5 )||( i==8 && j==6 )||( i==9 && j==5 )||( i==9 && j==6 )))
                rect(bx + i*40 +2, by + j*40 + 2, 36, 36)
          }

          bloco.draw_bloco()

          if ((mouseX > bloco.xpos - 40) && (mouseX < bloco.xpos + 40) && (mouseY > bloco.ypos - 40) && (mouseY < bloco.ypos + 40)) {
            cursor('pointer')
          } else {
            cursor('default')
          }
        } else {
          cursor('default')
          if(animation_1 < 200){
            background(255, 200, 230)

            let bx = 440, by = 320 

            for(let i = 0; i < 10; i++)
              for(let j = 0; j < 10; j++){
                noStroke()

                fill(150, 150, 255)

                if(!(( i==8 && j==5 )||( i==8 && j==6 )||( i==9 && j==5 )||( i==9 && j==6 )))
                  rect(bx + i*40 +2, by + j*40 + 2, 36, 36)
            }

            bloco.draw_bloco()
            animation_1++
          } else{
            sub_tela = 1;
          }
        }

      } else {
        draw_sub_tela()
      }
  }

  //Pregnancia

  else if(tela == 2){
    if(sub_tela == 0){
      if(animation_1 == 0){

        background(255, 200, 230)
        lista_circulos.showAll()

        if(lista_circulos.verifyCompleted()){
          animation_1 = 1;
        }

      } else if( animation_1 < 200){

        background(255, 200, 230)
        lista_circulos.showAll()

        stroke(200, 255, 170)
        strokeWeight(12)
        line(640-200, 360-200, 640+200, 360+200)
        line(640-200, 360+200, 640+200, 360-200)
        line(640-200, 360-200, 640-200, 360+200)
        line(640+200, 360-200, 640+200, 360+200)
        strokeWeight(1)
        noStroke()

        animation_1++;

      } else {

        noStroke()
        sub_tela = 1;
      }

    } else {
      draw_sub_tela()
    }
  }


  //Continuidade

  else if(tela == 3){
    if(sub_tela == 0){
      if(animation_1 == 0){

        background(255, 200, 230)
        lista_bolas.showAll()

        if(lista_bolas.verifyCompleted()){
          animation_1 = 1;
          bolas_completed = 1;
        }

      } else if( animation_1 < 200){

        background(255, 200, 230)
        lista_bolas.showAll()
        animation_1++;
      } else {

        noStroke()
        sub_tela = 1;
      }

    } else {
      draw_sub_tela()
    }
  }

  //Similaridade
  else if(tela == 4){
    if(sub_tela == 0){
      if(animation_1 == 0){
        background(255, 200, 230)
        lista_similares.showAll()
        if(lista_similares.verifyEquality()){
          animation_1 = 1;
        }
      } else if( animation_1 < 200){
        stroke(0)
        background(255, 200, 230)
        lista_similares.showAll()
        animation_1++;
      } else {
        noStroke()
        sub_tela = 1;
      }

    } else {
      draw_sub_tela()
    }
  }

  //Fechamento
  else if(tela == 5){
    if(sub_tela == 0){
      if(animation_1 == 0){
        background(255, 200, 230)
        lista_barras.showAll()
        
        if(lista_barras.verifyCompleted()){
          animation_1 = 1;
        }
      } else if( animation_1 < 200){
        stroke(0)
        background(255, 200, 230)

        //rect final
        noFill()
        stroke(200, 255, 170)
        strokeWeight(8)
        rect(640-200, 360-200, 400, 400)
        strokeWeight(1)
        noStroke()

        lista_barras.showAll()

        animation_1++;
      } else {
        noStroke()
        sub_tela = 1;
      }

    } else {
      draw_sub_tela()
    }
  }

  //Segregacao
  else if(tela == 6){
    if(sub_tela == 0){
      if(animation_1 == 0){
        background(255, 200, 230)

        draw_quadrado_black(425, 240, 3)
        draw_quadrado_black(575, 240, 2)
        draw_quadrado_black(725, 240, 1)
        draw_quadrado_black(875, 240, 0)

        lista_quadrados.showAll()
        
        if(lista_quadrados.verifyCompleted()){
          animation_1 = 1;
        }
      } else if( animation_1 < 200){

        background(255, 200, 230)

        draw_quadrado_black(425, 240, 3)
        draw_quadrado_black(575, 240, 2)
        draw_quadrado_black(725, 240, 1)
        draw_quadrado_black(875, 240, 0)

        lista_quadrados.showAll()

        animation_1++;
      } else {
        noStroke()
        sub_tela = 1;
      }

    } else {
      draw_sub_tela()
    }
  }

  //Unificação
  else if(tela == 7){
    if(sub_tela == 0){
      if(animation_1 == 0){
        background(255, 200, 230)

        lista_unidades.showAll()
        
        if(lista_unidades.verifyCompleted()){
          unidades_completed = 1;
          animation_1 = 1;
        }
      } else if( animation_1 < 200){

        background(255, 200, 230)

        lista_unidades.showAll()

        animation_1++;
      } else {
        noStroke()
        sub_tela = 1;
      }

    } else {
      draw_sub_tela()
    }
  }

  //Unidade
  else if(tela == 8){
    image(slide_8, 0, 0, 1280, 720)
  }
}

function mouseClicked(){
  if(tela == 0){
    lista_buttons.verifyclicked()
    if(lista_buttons.verifyAllCompleted()){
      if(final_button.isClicked()){
        tela = 8
        cursor('default')
      }
    }
  }
  if(sub_tela == 1){
    if(botao_menu.verifyhover()){
      lista_buttons.ligar(tela)
      cursor('default')
      animation_1 = 0;
      sub_tela =0;
      tela =0;
    }
  }
  if(tela == 2 && sub_tela == 0){
    lista_circulos.verifyclicked()
  }
  if(tela == 4 && sub_tela == 0){
    lista_similares.verifyclicked()
  }
  if(tela == 3 && sub_tela == 0){
    lista_bolas.verifyclicked()
  }
  if(tela == 5 && sub_tela == 0){
    lista_barras.verifyclicked()
  }
  if(tela == 6 && sub_tela == 0){
    lista_quadrados.verifyclicked()
  }
  if(tela == 7 && sub_tela == 0){
    lista_unidades.verifyclicked()
  }
}

function mouseReleased() {
  if(tela == 1 && sub_tela == 0){
    let limit = 3;
    if( dist(800, 560, bloco.xpos, bloco.ypos) < limit ){
      animation_1 = 1;
    }
  }
}

function mouseDragged(){
  if(tela == 1 && sub_tela == 0){
    if ((mouseX > bloco.xpos - 40) && (mouseX < bloco.xpos + 40)) {
      if ((mouseY > bloco.ypos - 40) && (mouseY < bloco.ypos + 40)) {
        bloco.xpos = mouseX;
        bloco.ypos = mouseY
      }
    }
  }
}