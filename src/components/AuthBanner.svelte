<script lang="ts">
    import * as THREE from "three";
    import { OrbitControls, Sky } from "three/addons";
    const { class: className }: { class?: string } = $props();
    let canvas: HTMLCanvasElement;

    function main() {
        const rerender = new THREE.WebGLRenderer({
            antialias: true,
            canvas,
            alpha: true,
        });
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 2, 0.1);
        const light = new THREE.DirectionalLight(0xffffff, 3);
        const controls = new OrbitControls(camera, canvas);

        controls.autoRotate = true;
        controls.update();

        camera.position.z = 3;
        light.position.set(-1, 2, 4);

        scene.add(light);

        const sky = new Sky();

        sky.scale.setScalar(450000);

        const phi = THREE.MathUtils.degToRad(90);
        const theta = THREE.MathUtils.degToRad(180);
        const sunPosition = new THREE.Vector3().setFromSphericalCoords(
            1,
            phi,
            theta,
        );

        sky.material.uniforms.sunPosition.value = sunPosition;

        scene.add(sky);

        function render(time: number) {
            time /= 1000;
            controls.update();
            rerender.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    $effect(() => {
        main();
    });
</script>

<canvas
    bind:this={canvas}
    class="w-full h-full {className}"
    width="1200"
    height="600"
></canvas>
