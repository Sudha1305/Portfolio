(() => {
	const root = document.getElementById("r");
	if (!root) return;

	const hiddenSkills = [
		"Pandas",
		"NumPy",
		"Scikit-learn",
		"TensorFlow",
		"Keras",
		"Transformers",
		"Jupyter",
		"CNN",
		"AI Systems",
	];
	const skillStyle = document.createElement("style");
	skillStyle.textContent = hiddenSkills
		.map((name) => `#skills .el[aria-label^="${name},"]{display:none!important}`)
		.join("\n");
	document.head.append(skillStyle);

	const certificateStyle = document.createElement("style");
	certificateStyle.textContent = `
		#certifications .ct { display: block; }
		#certifications .ct-l { position: static; max-width: 620px; }
		#certifications .ct-r {
			display: grid;
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 16px;
			margin-top: 48px;
			border: 0;
		}
		#certifications .ct-r > li { display: flex; min-width: 0; border: 0; }
		#certifications .row {
			box-sizing: border-box;
			width: 100%;
			min-height: 310px;
			padding: clamp(22px, 3vw, 32px);
			display: flex;
			flex-direction: column;
			align-items: stretch;
			border: 0;
			border-radius: 26px;
			background: var(--card);
			color: var(--ink);
			box-shadow: inset 0 0 0 1px var(--line);
			transition: transform .5s var(--ease), box-shadow .5s var(--ease);
		}
		#certifications .row::before { content: none; }
		#certifications .row:hover,
		#certifications .row:focus-visible {
			color: var(--ink);
			transform: translateY(-5px);
			box-shadow: inset 0 0 0 1px var(--line), 0 24px 40px -28px rgba(13, 13, 13, .3);
		}
		#certifications .row .i {
			width: 52px;
			height: 52px;
			display: grid;
			place-items: center;
			border-radius: 16px;
			background: var(--soft);
			color: var(--ink);
			font-size: 13px;
			opacity: 1;
		}
		#certifications .row > div { margin-top: 34px; }
		#certifications .row h3 { font-size: clamp(20px, 2vw, 25px); }
		#certifications .row p { margin-top: 8px; color: var(--mute); }
		#certifications .row .ar {
			display: flex;
			align-items: center;
			gap: 8px;
			align-self: flex-start;
			margin-top: auto;
			padding-top: 26px;
			transform: none;
			opacity: 1;
			font-size: 14px;
			font-weight: 600;
		}
		#certifications .row .ar::before { content: "View Certificate"; }
		#certifications .row:hover .ar,
		#certifications .row:focus-visible .ar { transform: none; }
		@media (max-width: 700px) {
			#certifications .ct-r { margin-top: 36px; }
			#certifications .row { min-height: 280px; }
		}
		@media (max-width: 900px) {
			#certifications .ct-r { grid-template-columns: repeat(2, minmax(0, 1fr)); }
		}
		@media (max-width: 560px) {
			#certifications .ct-r { grid-template-columns: 1fr; }
		}
	`;
	document.head.append(certificateStyle);

	const aboutContent =
		'I am a <strong>Full-Stack Developer &amp; AI Engineer</strong> dedicated to bridging the gap between robust software engineering and advanced artificial intelligence. I specialize in building comprehensive, end-to-end applications powered by intelligent <strong>AI models, LLMs, and automated workflows</strong>. My expertise spans designing clean and responsive application architectures, implementing intelligent agents, and optimizing prompts for maximum model performance. I thrive on writing clean code, engineering measurable system impacts, and continuously scaling complex applications with the latest in machine learning.';
	const applyPageAdjustments = () => {
		const hero = root.querySelector(".hero");
		if (hero) hero.querySelector(".hero-ghost")?.remove();
		const aboutCopy = root.querySelector("#about .ab-l > p.rv:not(.tag)");
		if (aboutCopy && aboutCopy.innerHTML !== aboutContent) {
			aboutCopy.innerHTML = aboutContent;
		}
		root.querySelector("#about .ab-q")?.remove();

		root.querySelectorAll('a[href="#achievements"]').forEach((link) => {
			if (link.textContent.trim() !== "Highlights") {
				link.textContent = "Highlights";
			}
		});

		const cards = root.querySelectorAll("#work .pn");
		if (!hero || !aboutCopy || !cards.length) return false;

		["assets/IMAGE.jpg", "assets/image1.jpg"].forEach((src, index) => {
			const image = cards[index]?.querySelector(".bd-r img");
			if (image) image.src = src;
		});
		return true;
	};

	const pageObserver = new MutationObserver(applyPageAdjustments);
	pageObserver.observe(root, { childList: true, subtree: true });
	applyPageAdjustments();

	const updateButton = (button, video) => {
		const playingWithSound = !video.paused && !video.muted;
		button.setAttribute("aria-pressed", String(playingWithSound));
		button.setAttribute(
			"aria-label",
			video.paused
				? "Resume intro video"
				: playingWithSound
					? "Pause and mute intro video"
					: "Turn intro sound on"
		);
		button.classList.remove("ping");
		button.innerHTML = playingWithSound
			? '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><rect x="2" y="1" width="3.5" height="12" rx="1"/><rect x="8.5" y="1" width="3.5" height="12" rx="1"/></svg>'
			: '<svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true"><path d="M3 1.5v11l9-5.5z"/></svg>';
	};

	document.addEventListener(
		"click",
		(event) => {
			const button = event.target.closest(".hero .snd");
			if (!button) return;

			const video = button.closest(".hero")?.querySelector("video");
			if (!video) return;

			event.preventDefault();
			event.stopImmediatePropagation();

			if (video.paused) {
				window.__heroStopped = false;
				video.muted = false;
				video.play().catch(() => {
					video.muted = true;
					updateButton(button, video);
				});
			} else if (video.muted) {
				video.muted = false;
			} else {
				window.__heroStopped = true;
				video.pause();
				video.muted = true;
			}

			updateButton(button, video);
		},
		true
	);
})();
