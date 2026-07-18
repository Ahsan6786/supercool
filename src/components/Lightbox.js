"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Lightbox({ items = [], activeIndex = null, onClose }) {
  const { language } = useLanguage();
  const [activeIdx, setActiveIdx] = useState(activeIndex);
  
  // Image zoom and panning states
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fullscreen state
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Custom Video Controls states
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isPipSupported, setIsPipSupported] = useState(false);

  // Refs
  const lightboxRef = useRef(null);
  const videoRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialTouchDistance = useRef(null);
  const initialZoom = useRef(1);
  const touchStart = useRef({ x: 0, y: 0, time: 0 });

  const activeItem = items[activeIdx];

  // Sync index when activeIndex prop changes
  useEffect(() => {
    if (activeIndex !== null) {
      setActiveIdx(activeIndex);
      resetZoom();
      setIsLoading(true);
    }
  }, [activeIndex]);

  // Lock background scroll when open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  // Reset zoom & pan values
  const resetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Video PIP support check
  useEffect(() => {
    if (videoRef.current) {
      setIsPipSupported(
        document.pictureInPictureEnabled || 
        videoRef.current.webkitSupportsPresentationMode
      );
    }
  }, [activeItem]);

  // Video state initialization & event binding
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      setIsMuted(video.muted);
      setVolume(video.volume);
    };
    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleDurationChange = () => setDuration(video.duration);
    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setIsLoading(false);
    };
    const handleWaiting = () => setIsLoading(true);
    const handlePlaying = () => {
      setIsLoading(false);
      setIsPlaying(true);
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("volumechange", handleVolumeChange);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("durationchange", handleDurationChange);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("waiting", handleWaiting);
    video.addEventListener("playing", handlePlaying);

    // Auto-play the video when active item transitions
    video.play().catch(() => {
      // Autoplay blocked
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("volumechange", handleVolumeChange);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("durationchange", handleDurationChange);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("waiting", handleWaiting);
      video.removeEventListener("playing", handlePlaying);
    };
  }, [activeIdx, activeItem?.isVideo]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    setActiveIdx((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    resetZoom();
    setIsLoading(true);
  }, [items.length]);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    setActiveIdx((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    resetZoom();
    setIsLoading(true);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") {
        if (language === "ar") handleNext();
        else handlePrev();
      } else if (e.key === "ArrowRight") {
        if (language === "ar") handlePrev();
        else handleNext();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handlePrev, handleNext, onClose, language]);

  // Zoom control helper functions
  const zoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 5));
  const zoomOut = () => {
    setZoom((prev) => {
      const nextZoom = Math.max(prev - 0.5, 1);
      if (nextZoom === 1) {
        setPanX(0);
        setPanY(0);
      }
      return nextZoom;
    });
  };

  // Fullscreen support using HTML5 API
  const toggleFullscreen = () => {
    if (!lightboxRef.current) return;
    if (!document.fullscreenElement) {
      lightboxRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Listen to fullscreen changes outside standard triggers
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  // Time formatter helper
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Video control triggers
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeSlider = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
    }
  };

  const handleProgressSlider = (e) => {
    const percent = parseFloat(e.target.value);
    if (videoRef.current && duration) {
      const newTime = (percent / 100) * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const changePlaybackSpeed = (speed) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setShowSpeedMenu(false);
  };

  const handleReplay = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const togglePip = () => {
    if (!videoRef.current) return;
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture().catch(() => {});
    } else {
      videoRef.current.requestPictureInPicture().catch(() => {});
    }
  };

  // Mouse & Touch event handlers for zooming and panning
  const handleMouseDown = (e) => {
    if (zoom === 1 || activeItem?.isVideo) return;
    e.preventDefault();
    setIsDragging(true);
    dragStart.current = { x: e.clientX - panX, y: e.clientY - panY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging || zoom === 1 || activeItem?.isVideo) return;
    const newX = e.clientX - dragStart.current.x;
    const newY = e.clientY - dragStart.current.y;
    // Panning boundary logic based on current zoom scale
    const limitX = (zoom - 1) * 200;
    const limitY = (zoom - 1) * 200;
    setPanX(Math.max(-limitX, Math.min(limitX, newX)));
    setPanY(Math.max(-limitY, Math.min(limitY, newY)));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Swipe & Pinch zoom touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Single touch gesture - setup swipe detection / single finger drag
      const touch = e.touches[0];
      touchStart.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
      if (zoom > 1 && !activeItem?.isVideo) {
        setIsDragging(true);
        dragStart.current = { x: touch.clientX - panX, y: touch.clientY - panY };
      }
    } else if (e.touches.length === 2 && !activeItem?.isVideo) {
      // Double touch gesture - setup pinch zoom
      setIsDragging(false);
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      initialTouchDistance.current = dist;
      initialZoom.current = zoom;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging && zoom > 1 && !activeItem?.isVideo) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.current.x;
      const newY = touch.clientY - dragStart.current.y;
      const limitX = (zoom - 1) * 200;
      const limitY = (zoom - 1) * 200;
      setPanX(Math.max(-limitX, Math.min(limitX, newX)));
      setPanY(Math.max(-limitY, Math.min(limitY, newY)));
    } else if (e.touches.length === 2 && !activeItem?.isVideo && initialTouchDistance.current) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const dist = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);
      const scale = dist / initialTouchDistance.current;
      const targetZoom = Math.max(1, Math.min(initialZoom.current * scale, 5));
      setZoom(targetZoom);
      if (targetZoom === 1) {
        setPanX(0);
        setPanY(0);
      }
    }
  };

  const handleTouchEnd = (e) => {
    setIsDragging(false);
    initialTouchDistance.current = null;

    if (e.changedTouches.length === 1 && zoom === 1) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStart.current.x;
      const deltaY = touch.clientY - touchStart.current.y;
      const deltaTime = Date.now() - touchStart.current.time;

      // Detect swipe gestures (swipe threshold: 50px, duration < 300ms)
      if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 60 && deltaTime < 300) {
        if (deltaX > 0) {
          // Swipe right -> Prev
          if (language === "ar") handleNext();
          else handlePrev();
        } else {
          // Swipe left -> Next
          if (language === "ar") handlePrev();
          else handleNext();
        }
      }
    }
  };

  if (activeIndex === null || !activeItem) return null;

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={lightboxRef}
      className="fixed inset-0 z-[1000] flex flex-col justify-between select-none bg-black/95 backdrop-blur-md transition-all duration-300 font-sans"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Action Bar (Glassmorphism design style) */}
      <div className="w-full flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent z-20">
        <span className="text-white/80 font-bold text-sm tracking-wide md:text-base">
          {activeIdx + 1} / {items.length}
        </span>

        <div className="flex items-center gap-2 md:gap-4">
          {/* Zoom controls for Image */}
          {!activeItem.isVideo && (
            <div className="flex items-center gap-1 bg-white/10 hover:bg-white/15 rounded-full px-2 py-1 transition-colors">
              <button
                onClick={zoomOut}
                disabled={zoom <= 1}
                className="w-8 h-8 flex items-center justify-center text-white disabled:text-white/40 cursor-pointer"
                title="Zoom Out"
              >
                <i className="fa-solid fa-magnifying-glass-minus text-sm" />
              </button>
              <span className="text-xs text-white/90 font-black min-w-8 text-center select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={zoom >= 5}
                className="w-8 h-8 flex items-center justify-center text-white disabled:text-white/40 cursor-pointer"
                title="Zoom In"
              >
                <i className="fa-solid fa-magnifying-glass-plus text-sm" />
              </button>
            </div>
          )}

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white hover:scale-105 transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            <i className={`fa-solid ${isFullscreen ? "fa-minimize" : "fa-expand"} text-sm`} />
          </button>

          {/* Download Button */}
          <a
            href={activeItem.src}
            download
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white hover:scale-105 transition-all"
            title="Download Media"
            onClick={(e) => {
              // Ensure we open in a new tab if browser doesn't force download
              if (activeItem.isVideo) {
                e.stopPropagation();
              }
            }}
          >
            <i className="fa-solid fa-download text-sm" />
          </a>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-accent/90 hover:bg-accent text-white flex items-center justify-center hover:rotate-90 hover:scale-105 transition-all duration-300 cursor-pointer"
            title="Close Lightbox"
          >
            <i className="fa-solid fa-xmark text-lg" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden cursor-default"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/40">
            <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Previous Button (Hidden on Mobile) */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className={`absolute ${language === "ar" ? "right-6" : "left-6"} hidden md:flex w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white text-lg z-20 hover:scale-110 transition-all cursor-pointer`}
          >
            <i className={`fa-solid ${language === "ar" ? "fa-chevron-right" : "fa-chevron-left"}`} />
          </button>
        )}

        {/* Media Container */}
        <div
          className="w-full h-full flex items-center justify-center p-4 md:p-12 relative"
          style={{ pointerEvents: zoom > 1 ? "auto" : "none" }}
        >
          {activeItem.isVideo ? (
            <video
              ref={videoRef}
              src={activeItem.src}
              className="max-h-full max-w-full rounded-lg object-contain shadow-2xl z-10"
              playsInline
              preload="auto"
              onClick={(e) => {
                e.stopPropagation();
                togglePlay();
              }}
              style={{ pointerEvents: "auto" }}
            />
          ) : (
            <div
              className="relative max-h-full max-w-full flex items-center justify-center transition-transform duration-100 ease-out select-none"
              style={{
                transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`,
                cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "default",
                width: activeItem.width ? `${activeItem.width}px` : "100%",
                height: activeItem.height ? `${activeItem.height}px` : "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                pointerEvents: "auto"
              }}
            >
              <Image
                src={activeItem.src}
                alt={language === "ar" ? activeItem.altAr : activeItem.altEn}
                fill
                className="object-contain rounded-lg"
                onLoad={() => setIsLoading(false)}
                priority
                draggable={false}
                sizes="(max-width: 768px) 100vw, 85vw"
              />
            </div>
          )}
        </div>

        {/* Next Button (Hidden on Mobile) */}
        {items.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className={`absolute ${language === "ar" ? "left-6" : "right-6"} hidden md:flex w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white text-lg z-20 hover:scale-110 transition-all cursor-pointer`}
          >
            <i className={`fa-solid ${language === "ar" ? "fa-chevron-left" : "fa-chevron-right"}`} />
          </button>
        )}
      </div>

      {/* Bottom Info and Video Controls Bar */}
      <div className="w-full bg-gradient-to-t from-black/85 via-black/75 to-transparent px-4 py-6 md:px-8 z-20 text-white flex flex-col gap-4">
        {/* Description Label */}
        <p className="text-center text-sm md:text-base font-medium text-slate-200 drop-shadow-md max-w-3xl mx-auto leading-relaxed">
          {language === "ar" ? activeItem.altAr : activeItem.altEn}
        </p>

        {/* Video Custom Controller Container */}
        {activeItem.isVideo && (
          <div className="w-full max-w-4xl mx-auto flex flex-col gap-2.5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-3 md:p-4 shadow-xl z-20">
            {/* Timeline Progress Slider */}
            <div className="flex items-center gap-3 w-full">
              <span className="text-xs text-white/80 font-mono select-none">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 group py-2 cursor-pointer">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progressPercent}
                  onChange={handleProgressSlider}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-accent focus:outline-none"
                  style={{
                    background: `linear-gradient(to right, var(--color-accent) ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`
                  }}
                />
              </div>
              <span className="text-xs text-white/80 font-mono select-none">
                {formatTime(duration)}
              </span>
            </div>

            {/* Main Controls Panel */}
            <div className="flex items-center justify-between flex-wrap gap-3">
              {/* Playback Controls & Speed menu */}
              <div className="flex items-center gap-2 md:gap-3">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center hover:scale-105 transition-colors cursor-pointer"
                  title={isPlaying ? "Pause" : "Play"}
                >
                  <i className={`fa-solid ${isPlaying ? "fa-pause" : "fa-play"} text-sm`} />
                </button>
                <button
                  onClick={handleReplay}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center hover:scale-105 transition-colors cursor-pointer"
                  title="Replay"
                >
                  <i className="fa-solid fa-rotate-left text-sm" />
                </button>

                {/* Speed Menu Select */}
                <div className="relative z-30">
                  <button
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="h-10 px-3 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center gap-1.5 text-xs font-bold hover:scale-105 transition-colors cursor-pointer"
                    title="Playback Speed"
                  >
                    <span>{playbackSpeed}x</span>
                    <i className="fa-solid fa-caret-up text-[10px]" />
                  </button>
                  {showSpeedMenu && (
                    <div className="absolute bottom-12 left-0 bg-slate-900/95 border border-white/10 backdrop-blur-md rounded-xl p-1 shadow-2xl flex flex-col gap-0.5 min-w-[80px]">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((sp) => (
                        <button
                          key={sp}
                          onClick={() => changePlaybackSpeed(sp)}
                          className={`px-3 py-1.5 rounded-lg text-left text-xs font-bold transition-colors cursor-pointer ${
                            playbackSpeed === sp ? "bg-accent text-white" : "hover:bg-white/10 text-white/80"
                          }`}
                        >
                          {sp}x
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Volume & PiP controls */}
              <div className="flex items-center gap-3">
                {/* Volume icon & bar */}
                <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
                  <button
                    onClick={toggleMute}
                    className="text-white hover:text-accent/90 transition-colors cursor-pointer"
                    title={isMuted ? "Unmute" : "Mute"}
                  >
                    <i className={`fa-solid ${isMuted || volume === 0 ? "fa-volume-xmark" : volume < 0.5 ? "fa-volume-low" : "fa-volume-high"} text-xs`} />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeSlider}
                    className="w-16 h-1 bg-white/25 rounded-lg appearance-none cursor-pointer accent-white hover:accent-accent focus:outline-none"
                    style={{
                      background: `linear-gradient(to right, white ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%)`
                    }}
                  />
                </div>

                {/* Picture in Picture */}
                {isPipSupported && (
                  <button
                    onClick={togglePip}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center hover:scale-105 transition-colors cursor-pointer"
                    title="Picture in Picture"
                  >
                    <i className="fa-solid fa-window-restore text-xs" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
