// Static overlay animation
const overlay = document.querySelector('.static-overlay');
let x = 0, y = 0;

function animateStatic() {
    x += 0.7;
    y += 0.4;
    overlay.style.backgroundPosition = `${x}px ${y}px`;
    requestAnimationFrame(animateStatic);
}

animateStatic();

// TV functionality
const channels = ['channel1', 'channel2', 'channel3', 'channel4', 'channel5'];
const channelNames = ['RICH TV', 'WEALTH NEWS', 'MONEY TALKS', 'CRYPTO LIVE', 'SUCCESS ZONE'];
let currentChannel = 0;
let isPoweredOn = false;
let isPaused = false;
let isVolumeOn = false;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get all TV elements
    const tvTextOverlay = document.getElementById('tvTextOverlay');
    const channelDisplay = document.getElementById('channelDisplay');
    const blackScreen = document.getElementById('blackScreen');
    const powerButton = document.getElementById('powerButton');
    const pauseButton = document.getElementById('pauseButton');
    const volumeButton = document.getElementById('volumeButton');
    const channelUpButton = document.getElementById('channelUp');
    const channelDownButton = document.getElementById('channelDown');

    // Check if elements exist
    if (!tvTextOverlay || !channelDisplay || !blackScreen || !powerButton || !pauseButton || !volumeButton || !channelUpButton || !channelDownButton) {
        console.error('TV elements not found!');
        return;
    }

    // Initialize TV state
    blackScreen.classList.remove('hidden');
    tvTextOverlay.classList.remove('visible');
    channelDisplay.classList.remove('visible');

    // Initialize calculators
    setTimeout(() => {
        console.log('Initializing calculators...');
        renderFireCalculator();
        renderFireTokenCalculator();
    }, 500);

    function switchChannel(direction) {
        if (!isPoweredOn) return;
        const currentVideo = document.getElementById(channels[currentChannel]);
        if (!currentVideo) return;
        
        currentVideo.classList.remove('active');
        currentVideo.pause();
        if (direction === 'up') {
            currentChannel = (currentChannel + 1) % channels.length;
        } else {
            currentChannel = currentChannel === 0 ? channels.length - 1 : currentChannel - 1;
        }
        const newVideo = document.getElementById(channels[currentChannel]);
        if (!newVideo) return;
        
        document.querySelector('.tv-screen').classList.add('channel-switching');
        setTimeout(() => {
            newVideo.classList.add('active');
            newVideo.muted = !isVolumeOn;
            if (!isPaused) newVideo.play();
            channelDisplay.textContent = `CH ${currentChannel + 1}`;
            tvTextOverlay.textContent = `> CHANNEL: ${channelNames[currentChannel]}\n> WEALTH CONTENT\n> LOADING...`;
            setTimeout(() => {
                if (isPoweredOn && !isPaused) {
                    tvTextOverlay.textContent = `> ${channelNames[currentChannel]}\n> LIVE BROADCAST\n> GETTING RICH`;
                }
            }, 1000);
            document.querySelector('.tv-screen').classList.remove('channel-switching');
        }, 150);
    }

    powerButton.addEventListener('click', () => {
        isPoweredOn = !isPoweredOn;
        powerButton.classList.toggle('active', isPoweredOn);
        if (isPoweredOn) {
            blackScreen.classList.add('hidden');
            tvTextOverlay.classList.add('visible');
            channelDisplay.classList.add('visible');
            tvTextOverlay.textContent = '> POWERING ON...';
            tvTextOverlay.classList.add('powering-on');
            channelDisplay.textContent = 'CH 1';
            setTimeout(() => {
                const currentVideo = document.getElementById(channels[currentChannel]);
                if (currentVideo) {
                    currentVideo.classList.add('active');
                    currentVideo.play();
                }
            }, 500);
            if (!isVolumeOn) {
                isVolumeOn = true;
                volumeButton.classList.add('active');
                const currentVideo = document.getElementById(channels[currentChannel]);
                if (currentVideo) currentVideo.muted = false;
            }
            setTimeout(() => {
                if (isPoweredOn) {
                    tvTextOverlay.classList.remove('powering-on');
                    tvTextOverlay.textContent = `> ${channelNames[currentChannel]}\n> LIVE BROADCAST\n> GETTING RICH`;
                }
            }, 2000);
        } else {
            blackScreen.classList.remove('hidden');
            tvTextOverlay.classList.remove('visible');
            channelDisplay.classList.remove('visible');
            tvTextOverlay.classList.remove('powering-on');
            tvTextOverlay.textContent = '> SYSTEM OFFLINE';
            channelDisplay.textContent = '';
            channels.forEach(channelId => {
                const video = document.getElementById(channelId);
                if (video) {
                    video.classList.remove('active');
                    video.pause();
                }
            });
            if (isPaused) {
                isPaused = false;
                pauseButton.classList.remove('active');
                pauseButton.innerHTML = '▶';
            }
            if (isVolumeOn) {
                isVolumeOn = false;
                volumeButton.classList.remove('active');
            }
        }
    });

    pauseButton.addEventListener('click', () => {
        if (!isPoweredOn) return;
        isPaused = !isPaused;
        pauseButton.classList.toggle('active', isPaused);
        const currentVideo = document.getElementById(channels[currentChannel]);
        if (!currentVideo) return;
        
        if (isPaused) {
            pauseButton.innerHTML = '▶';
            currentVideo.pause();
            tvTextOverlay.textContent = '> BROADCAST PAUSED\n> WEALTH HALTED\n> PRESS PLAY';
        } else {
            pauseButton.innerHTML = '⏸';
            currentVideo.play();
            tvTextOverlay.textContent = `> ${channelNames[currentChannel]}\n> LIVE BROADCAST\n> GETTING RICH`;
        }
    });

    volumeButton.addEventListener('click', () => {
        if (!isPoweredOn) return;
        isVolumeOn = !isVolumeOn;
        volumeButton.classList.toggle('active', isVolumeOn);
        const currentVideo = document.getElementById(channels[currentChannel]);
        if (!currentVideo) return;
        
        if (isVolumeOn) {
            currentVideo.muted = false;
            tvTextOverlay.textContent = '> VOLUME: ON\n> AUDIO ENABLED\n> WEALTH SOUNDS';
        } else {
            currentVideo.muted = true;
            tvTextOverlay.textContent = '> VOLUME: OFF\n> SILENT MODE\n> VISUAL ONLY';
        }
        setTimeout(() => {
            if (isPoweredOn && !isPaused) {
                tvTextOverlay.textContent = `> ${channelNames[currentChannel]}\n> LIVE BROADCAST\n> GETTING RICH`;
            }
        }, 2000);
    });

    channelUpButton.addEventListener('click', () => switchChannel('up'));
    channelDownButton.addEventListener('click', () => switchChannel('down'));
});

// Social links hover effect
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-2px)';
    });
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0)';
    });
});

// Profile Picture Generator
const openPfpGen = document.getElementById('openPfpGen');
const pfpOverlay = document.getElementById('pfpOverlay');
const closePfpGen = document.getElementById('closePfpGen');

openPfpGen.addEventListener('click', () => {
    pfpOverlay.classList.add('active');
});

closePfpGen.addEventListener('click', () => {
    pfpOverlay.classList.remove('active');
});

pfpOverlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
});

// Canvas and PFP Generator
let canvas;
const landingPage = document.getElementById('landing-page');
const editorPage = document.getElementById('editor-page');
const imageUpload = document.getElementById('imageUpload');
const dropZone = document.getElementById('dropZone');
const deleteBtn = document.getElementById('deleteBtn');
const saveBtn = document.getElementById('saveBtn');
const backBtn = document.getElementById('backBtn');

deleteBtn.style.display = 'none';

function toggleDeleteButton(show) {
    deleteBtn.style.display = show ? 'inline-block' : 'none';
}

function initCanvas() {
    canvas = new fabric.Canvas('imageCanvas');
    resizeCanvas();
    canvas.on('selection:created', function() { toggleDeleteButton(true); });
    canvas.on('selection:cleared', function() { toggleDeleteButton(false); });
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    const canvasContainer = document.querySelector('.canvas-container');
    let availableHeight, availableWidth;
    const maxWidthPercentage = 0.7;
    const leftScreenWidth = window.innerWidth * maxWidthPercentage;
    
    if (window.innerWidth >= 1200) {
        const bgImage = canvas.backgroundImage;
        if (bgImage) {
            let imgWidth = bgImage.width;
            let imgHeight = bgImage.height;
            if (imgWidth > leftScreenWidth) {
                const scaleFactor = leftScreenWidth / imgWidth;
                imgWidth = leftScreenWidth;
                imgHeight = imgHeight * scaleFactor;
            }
            canvas.setWidth(imgWidth);
            canvas.setHeight(imgHeight);
            const canvasContainerParent = canvasContainer.parentElement;
            canvasContainer.style.width = `${imgWidth}px`;
            canvasContainer.style.height = `${imgHeight}px`;
            const containerHeight = canvasContainerParent.offsetHeight;
            const topOffset = (containerHeight - imgHeight) / 2;
            canvasContainer.style.marginTop = `${topOffset}px`;
            canvasContainer.style.marginLeft = 'auto';
            canvasContainer.style.marginRight = 'auto';
            canvas.setBackgroundImage(bgImage, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / bgImage.width,
                scaleY: canvas.height / bgImage.height
            });
        }
    } else {
        availableHeight = window.innerHeight * 0.7;
        availableWidth = window.innerWidth * 0.8;
        if (window.innerWidth < 768) {
            availableHeight = window.innerHeight * 0.4;
            availableWidth = window.innerWidth * 0.95;
        }
        canvas.setWidth(availableWidth);
        canvas.setHeight(availableHeight);
    }
    canvas.renderAll();
}

function handleImageUpload(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        fabric.Image.fromURL(event.target.result, function(img) {
            canvas.clear();
            canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
                scaleX: canvas.width / img.width,
                scaleY: canvas.height / img.height
            });
            img.set({ selectable: false });
            setTimeout(() => {
                if (window.innerWidth >= 1200) {
                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    const leftScreenWidth = window.innerWidth * 0.7;
                    if (imgWidth > leftScreenWidth) {
                        const scaleFactor = leftScreenWidth / imgWidth;
                        imgWidth = leftScreenWidth;
                        imgHeight = imgHeight * scaleFactor;
                    }
                    canvas.setWidth(imgWidth);
                    canvas.setHeight(imgHeight);
                    canvas.renderAll();
                    const canvasContainer = document.querySelector('.canvas-container');
                    const containerHeight = canvasContainer.parentElement.offsetHeight;
                    const topOffset = (containerHeight - imgHeight) / 2;
                    canvasContainer.style.width = `${imgWidth}px`;
                    canvasContainer.style.height = `${imgHeight}px`;
                    canvasContainer.style.marginTop = `${topOffset}px`;
                    canvasContainer.style.marginLeft = 'auto';
                    canvasContainer.style.marginRight = 'auto';
                }
                landingPage.classList.remove('active');
                editorPage.classList.add('active');
                resizeCanvas();
                canvas.renderAll();
            }, 100);
        });
    }
    reader.readAsDataURL(file);
}

imageUpload.addEventListener('change', function(e) {
    handleImageUpload(e.target.files[0]);
});

dropZone.addEventListener('dragover', function(e) {
    e.preventDefault();
    e.stopPropagation();
});

dropZone.addEventListener('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    handleImageUpload(e.dataTransfer.files[0]);
});

function addThumbnails() {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    for (let i = 20; i <= 45; i++) {
        const thumbnail = document.createElement('img');
        thumbnail.src = `img/thumbnail${i}.png`;
        thumbnail.classList.add('thumbnail');
        thumbnail.addEventListener('click', function() {
            fabric.Image.fromURL(this.src, function(img) {
                img.scaleToWidth(100);
                const canvasCenter = canvas.getCenter();
                img.set({
                    left: canvasCenter.left - img.getScaledWidth() / 2,
                    top: canvasCenter.top - img.getScaledHeight() / 2,
                    originX: 'left',
                    originY: 'top'
                });
                canvas.add(img);
                canvas.setActiveObject(img);
                canvas.renderAll();
            });
        });
        thumbnailGrid.appendChild(thumbnail);
    }
}

deleteBtn.addEventListener('click', function() {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
        canvas.remove(activeObject);
        canvas.renderAll();
        toggleDeleteButton(false);
    }
});

saveBtn.addEventListener('click', function() {
    const originalDataURL = canvas.toDataURL({
        format: 'png',
        quality: 1
    });
    const offscreenCanvas = document.createElement('canvas');
    const footerHeight = 40;
    offscreenCanvas.width = canvas.width;
    offscreenCanvas.height = canvas.height + footerHeight;
    const ctx = offscreenCanvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
        const dataURLWithFooter = offscreenCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURLWithFooter;
        link.download = 'pfp_with_footer.png';
        link.click();
    };
    img.src = originalDataURL;
});

backBtn.addEventListener('click', function() {
    editorPage.classList.remove('active');
    landingPage.classList.add('active');
    canvas.clear();
    canvas.setBackgroundImage(null);
    canvas.renderAll();
    imageUpload.value = '';
    dropZone.innerHTML = 'Drag & Drop your image here';
});

// Fire columns animation
document.addEventListener('DOMContentLoaded', function() {
    const fireCols = document.querySelectorAll('.fire-columns > div');
    const sectionThree = document.querySelector('.section-three');
    if (!fireCols.length || !sectionThree) return;

    fireCols.forEach(col => {
        col.style.opacity = '0';
        col.style.transform = 'translateY(120px) scale(0.97)';
        col.style.filter = 'none';
        col.style.animation = 'none';
    });

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fireCols.forEach((col, idx) => {
                    col.style.animation = `riseUpWealth 2.5s cubic-bezier(.22,1,.36,1) forwards`;
                    col.style.animationDelay = `${0.2 + idx * 0.6}s`;
                });
                obs.disconnect();
            }
        });
    }, {
        threshold: 0.15
    });

    observer.observe(sectionThree);
});

// FIRE Calculator Functions
function calculateYearsToFire({ income, expenses, savings, annualReturn = 0.07 }) {
    const fireNumber = expenses * 25;
    const annualSavings = income - expenses;
    if (annualSavings <= 0) return Infinity;
    if (savings >= fireNumber) return 0;
    const r = annualReturn;
    const FV = fireNumber;
    const PV = savings;
    const PMT = annualSavings;
    const numerator = Math.log((FV * r + PMT) / (PV * r + PMT));
    const denominator = Math.log(1 + r);
    const years = numerator / denominator;
    return years > 0 ? years : 0;
}

function getFireLabel(years) {
    if (years <= 0) return { label: "Already FIRE!", emoji: "🎉" };
    if (years < 5) return { label: "Years to Freedom!", emoji: "🚀" };
    if (years < 10) return { label: "Years to Escape", emoji: "🔥" };
    if (years < 20) return { label: "Years (Still Better Than 40!)", emoji: "💸" };
    return { label: "Years (Time to Increase Income)", emoji: "⏳" };
}

function formatNumberWithCommas(value) {
    if (value === "" || value === null || value === undefined) return "";
    const num = typeof value === "number" ? value : value.replace(/,/g, "");
    if (isNaN(Number(num))) return "";
    return Number(num).toLocaleString();
}

function renderFireCalculator() {
    console.log('Rendering FIRE Calculator...');
    const root = document.getElementById('fire-calculator-root');
    if (!root) {
        console.error('fire-calculator-root element not found!');
        return;
    }
    console.log('FIRE Calculator root found:', root);
    root.innerHTML = `
        <label class="fire-input-label">Annual Income
            <input type="text" id="fire-income" class="fire-input" value="100,000">
        </label>
        <label class="fire-input-label">Annual Expenses
            <input type="text" id="fire-expenses" class="fire-input" value="40,000">
        </label>
        <label class="fire-input-label">Current Savings
            <input type="text" id="fire-savings" class="fire-input" value="50,000">
        </label>
        <div id="fire-bar-container" class="fire-bar-container"></div>
        <div class="fire-bar-labels">
            <span id="fire-bar-now"></span>
            <span id="fire-bar-goal"></span>
        </div>
        <div id="fire-results" class="fire-results"></div>
    `;

    function updateResults() {
        const income = Number(document.getElementById('fire-income').value.replace(/,/g, "")) || 0;
        const expenses = Number(document.getElementById('fire-expenses').value.replace(/,/g, "")) || 0;
        const savings = Number(document.getElementById('fire-savings').value.replace(/,/g, "")) || 0;
        const fireNumber = expenses * 25;
        const savingsRate = income > 0 ? (((income - expenses) / income) * 100).toFixed(1) : 0;
        const years = calculateYearsToFire({ income, expenses, savings });
        const label = getFireLabel(years);

        const percent = Math.min(100, Math.max(0, (fireNumber > 0 ? (savings / fireNumber) * 100 : 0)));
        const barContainer = document.getElementById('fire-bar-container');
        const emojiPosition = Math.min(85, Math.max(5, percent - 5)); // Constrain emoji position
        const clampedPercent = Math.min(100, Math.max(0, percent)); // Double-check percentage bounds
        barContainer.innerHTML = `
            <div class="fire-bar-fill" style="width: ${clampedPercent}%;"></div>
            <span class="fire-bar-emoji" style="left: ${emojiPosition}%;">${label.emoji}</span>
        `;

        document.getElementById('fire-bar-now').textContent = `$${formatNumberWithCommas(savings)}`;
        document.getElementById('fire-bar-goal').textContent = `$${formatNumberWithCommas(fireNumber)}`;

        const yearsDisplay = isFinite(years)
            ? (years <= 0 ? label.emoji : years.toFixed(1))
            : "∞";
        const labelText = isFinite(years)
            ? label.label
            : "Not possible (increase savings)";
        document.getElementById('fire-results').innerHTML = `
            <div><b>FIRE Number:</b> $${formatNumberWithCommas(fireNumber)}</div>
            <div><b>Savings Rate:</b> ${savingsRate}%</div>
            <div style="margin-top: 4px; font-size: 1rem; color: #00ff99;">
                <span>${yearsDisplay}</span> <span>${labelText}</span>
            </div>
        `;
    }

    ['fire-income', 'fire-expenses', 'fire-savings'].forEach(id => {
        document.getElementById(id).addEventListener('input', function(e) {
            let val = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(val)) {
                e.target.value = formatNumberWithCommas(val);
                updateResults();
            }
        });
    });

    updateResults();
}

function renderFireTokenCalculator() {
    console.log('Rendering FIRE Token Calculator...');
    const root = document.getElementById('fire-token-calculator-root');
    if (!root) {
        console.error('fire-token-calculator-root element not found!');
        return;
    }
    console.log('FIRE Token Calculator root found:', root);
    root.innerHTML = `
        <label class="fire-input-label">$FiRe Tokens Owned
            <input type="text" id="token-amount" class="fire-input" value="0">
        </label>
        <label class="fire-input-label">Total $FiRe Supply
            <input type="text" value="1,000,000,000" class="fire-input" readonly>
        </label>
        <label class="fire-input-label">Your Retire Early Number
            <input type="text" id="retire-number" class="fire-input" value="1,000,000">
        </label>
        <div id="token-results" class="fire-results"></div>
        <div class="fire-info">
            <span role="img" aria-label="info">ℹ️</span> This is a fun, speculative calculator. Not financial advice.
        </div>
    `;

    function updateResults() {
        const tokenAmount = Number(document.getElementById('token-amount').value.replace(/,/g, "")) || 0;
        const totalSupply = 1000000000;
        const retireNumber = Number(document.getElementById('retire-number').value.replace(/,/g, "")) || 0;
        let requiredMarketCap = 0;
        if (tokenAmount > 0) {
            requiredMarketCap = (retireNumber * totalSupply) / tokenAmount;
        }
        document.getElementById('token-results').innerHTML =
            (tokenAmount > 0 && retireNumber > 0)
                ? `<b>Market Cap to Retire Early:</b> $${formatNumberWithCommas(Math.round(requiredMarketCap))}`
                : `—`;
    }

    ['token-amount', 'retire-number'].forEach(id => {
        document.getElementById(id).addEventListener('input', function(e) {
            let val = e.target.value.replace(/,/g, "");
            if (/^\d*$/.test(val)) {
                e.target.value = formatNumberWithCommas(val);
                updateResults();
            }
        });
    });

    updateResults();
}

// Dollar floating animation
const dollar = document.getElementById("floating-dollar");
const zone = document.querySelector(".dollar-zone");

if (dollar && zone) {
    let mouseX = zone.offsetWidth / 2;
    let mouseY = zone.offsetHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    zone.addEventListener("mousemove", (e) => {
        const rect = zone.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        mouseX = Math.max(0, Math.min(mouseX, zone.offsetWidth));
        mouseY = Math.max(0, Math.min(mouseY, zone.offsetHeight));
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        dollar.style.left = `${currentX}px`;
        dollar.style.top = `${currentY}px`;

        requestAnimationFrame(animate);
    }

    animate();
}

// Initialize everything on page load
window.onload = function() {
    console.log('Window loaded, initializing...');
    initCanvas();
    addThumbnails();
    
    // Mobile calculator toggle functionality
    initMobileCalculatorToggle();
}

// Mobile calculator toggle functionality
function initMobileCalculatorToggle() {
    const calculators = document.querySelector('.floating-calculators');
    const toggle = document.querySelector('.calc-toggle');
    
    if (!calculators || !toggle) return;
    
    // Check if we're on mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
  calculators.style.height = '40px';
  calculators.style.overflowY = 'hidden'; // Initially hidden

  toggle.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    if (calculators.classList.contains('expanded')) {
      calculators.classList.remove('expanded');
      calculators.style.height = '40px';
      calculators.style.overflowY = 'hidden';
    } else {
      calculators.classList.add('expanded');
      calculators.style.height = '65vh'; // fixed height for scrolling
      calculators.style.overflowY = 'auto'; // allow scroll inside
    }
  });

  document.addEventListener('click', function (e) {
    if (!calculators.contains(e.target)) {
      calculators.classList.remove('expanded');
      calculators.style.height = '40px';
      calculators.style.overflowY = 'hidden';
    }
  });
}

    
    // Handle resize events
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== isMobile) {
            location.reload(); // Reload to reset behaviors
        }
    });
}