import { Component, ElementRef, AfterViewInit, OnDestroy, ViewChild, HostListener } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private frameId: number | null = null;

  // Objeto para el sol
  private sun!: THREE.Mesh;
  // Aquí agregarás los objetos para las flores y la serpiente

  // Variables para la interacción con el mouse
  private mouse = new THREE.Vector2();

  constructor() {}

  ngAfterViewInit(): void {
    this.initScene();
    this.animate();
  }

  private initScene(): void {
    const canvas = this.canvasRef.nativeElement;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Crear la escena y la cámara
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    this.camera.position.z = 5;

    // Iluminación básica
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    this.scene.add(directionalLight);

    // Crear el sol (una esfera amarilla)
    const sunGeometry = new THREE.SphereGeometry(1, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.scene.add(this.sun);

    // Aquí puedes inicializar y agregar las flores y la serpiente
    // Por ejemplo, podrías crear funciones como `this.createFlower()` y `this.createSnake()`
  }

  // Función de animación (se ejecuta en loop)
  private animate = () => {
    // Rotar el sol de forma sencilla
    this.sun.rotation.y += 0.01;

    // Actualizar objetos dinámicos en función de la posición del mouse
    // Ejemplo: podrías iterar sobre un array de "flores" y modificar su posición
    // según this.mouse.x y this.mouse.y

    // Renderizar la escena
    this.renderer.render(this.scene, this.camera);
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  // Escuchar cambios en el tamaño de la ventana para ajustar la cámara y el renderer
  @HostListener('window:resize')
  onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  // Escuchar el movimiento del mouse
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    // Convertir la posición del mouse a coordenadas normalizadas [-1, 1]
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Usa estos valores para actualizar la animación de las flores, por ejemplo
  }

  ngOnDestroy(): void {
    if (this.frameId !== null) {
      window.cancelAnimationFrame(this.frameId);
    }
  }
}
