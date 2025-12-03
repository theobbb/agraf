<script lang="ts">
	const FRAME_COUNT = 20;
	const FPS = 24;

	const frame_interval = 1000 / FPS;

	let current_frame = $state(-1);
	let last_frame_time = 0;
	let raf_id: number | null = null;

	let pressed_count = 0;
	let rotation = $state(0);

	function loop(time: number) {
		if (current_frame !== -1) {
			if (time - last_frame_time >= frame_interval) {
				current_frame++;

				if (current_frame >= FRAME_COUNT) {
					current_frame = -1;
					stop_sprite_loop();
					return;
				}
				last_frame_time = time;
			}
		}

		if (current_frame !== -1) {
			raf_id = requestAnimationFrame(loop);
		} else {
			raf_id = null;
		}
	}

	function start_sprite_loop() {
		if (raf_id) return;
		raf_id = requestAnimationFrame(loop);
	}

	function stop_sprite_loop() {
		if (!raf_id) return;
		cancelAnimationFrame(raf_id);
		raf_id = null;
	}

	function on_button_click() {
		pressed_count++;
		rotation = (pressed_count % 4) * 90;

		current_frame = 0;
		last_frame_time = performance.now();
		start_sprite_loop();
	}
</script>

<button class="cursor-pointer text-left" onclick={on_button_click}>Linkedin</button>

<div class="pointer-events-none fixed inset-0 z-500" style="image-rendering: pixelated-;">
	<div class="absolute inset-0 flex items-center justify-center overflow-hidden">
		<div
			class="sprite aspect-square h-full"
			style="width: 100svmax; height: 100svmax; background-size: {FRAME_COUNT *
				100}svmax 100svmax; background-position: -{current_frame *
				100}svmax 0; background-image: url('/images/sprites/explosion.png'); transform: rotate({rotation}deg);"
		></div>
	</div>
</div>
