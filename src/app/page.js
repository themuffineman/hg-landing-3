"use client";
import React, { useEffect, useRef } from "react";

import ProgressBar from "./components/ProgressBar";
import Indices from "./components/Indices";
import Card from "./components/Card";

import { Canvas } from "@react-three/fiber";
import { Gift } from "./components/Gift"
import { Sky } from "./components/Sky";

import santStanding from "../../public/santa_standing_on_sled.png";
import torrus from "../../public/Torus_array.png";

import { cardsData } from "./data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "@studio-freight/react-lenis";

gsap.registerPlugin(ScrollTrigger);
 
export default function Home() {
  const pinnedSectionRef = useRef(null);
  const cardsRef = useRef([]);
  const progressBarRef = useRef(null);
  const progressRef = useRef(null);
  const indicesContainerRef = useRef(null);
  const indicesRef = useRef([]);
  const stickyHeaderRef = useRef(null);

  useEffect(() => {
    const pinnedSection = pinnedSectionRef.current;
    const stickyHeader = stickyHeaderRef.current;
    const cards = cardsRef.current;
    const progressBarContainer = progressBarRef.current;
    const progressBar = progressRef.current;
    const indicesContainer = indicesContainerRef.current;
    const indices = indicesRef.current;

    const cardCount = cards.length;
    const pinnedHeight = window.innerHeight * (cardCount + 1);
    const startRotations = [0, 5, 0, -5];
    const endRotations = [-10, -5, 10, 5];
    const progressColors = ["#ecb74c", "#7dd8cd", "#e0ff57", "#7dd8cd"];

    cards.forEach((card, index) => {
      gsap.set(card, { rotation: startRotations[index] });
    });

    let isProgressBarVisible = false;
    let currentActiveIndex = -1;

    function animateIndexOpacity(newIndex) {
      if (newIndex !== currentActiveIndex) {
        indices.forEach((index, i) => {
          gsap.to(index, {
            opacity: i === newIndex ? 1 : 0.25,
            duration: 0.5,
            ease: "power2.out",
          });
        });
        currentActiveIndex = newIndex;
      }
    }

    function showProgressAndIndices() {
      gsap.to([progressBarContainer, indicesContainer], {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
      isProgressBarVisible = true;
    }

    function hideProgressAndIndices() {
      gsap.to([progressBarContainer, indicesContainer], {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });
      isProgressBarVisible = false;
      animateIndexOpacity(-1);
    }

    ScrollTrigger.create({
      trigger: pinnedSection,
      start: "top top",
      end: `+=${pinnedHeight}`,
      pin: true,
      pinSpacing: true,
      onLeave: () => {
        hideProgressAndIndices();
      },
      onEnterBack: () => {
        showProgressAndIndices();
      },
      onUpdate: (self) => {
        const progress = self.progress * (cardCount + 1);
        const currentCard = Math.floor(progress);

        if (progress <= 1) {
          gsap.to(stickyHeader, {
            opacity: 1 - progress,
            duration: 0.1,
            ease: "none",
          });
        } else {
          gsap.set(stickyHeader, { opacity: 0 });
        }

        if (progress > 1 && !isProgressBarVisible) {
          showProgressAndIndices();
        } else if (progress <= 1 && isProgressBarVisible) {
          hideProgressAndIndices();
        }

        let progressHeight = 0;
        let colorIndex = -1;
        if (progress > 1) {
          progressHeight = ((progress - 1) / cardCount) * 100;
          colorIndex = Math.min(Math.floor(progress - 1), cardCount - 1);
        }

        gsap.to(progressBar, {
          height: `${progressHeight}%`,
          backgroundColor: progressColors[colorIndex],
          duration: 0.3,
          ease: "power1.out",
        });

        if (isProgressBarVisible) {
          animateIndexOpacity(colorIndex);
        }

        cards.forEach((card, index) => {
          if (index < currentCard) {
            gsap.set(card, {
              top: "50%",
              rotation: endRotations[index],
            });
          } else if (index === currentCard) {
            const cardProgress = progress - currentCard;
            const newTop = gsap.utils.interpolate(150, 50, cardProgress);
            const newRotation = gsap.utils.interpolate(
              startRotations[index],
              endRotations[index],
              cardProgress
            );
            gsap.set(card, {
              top: `${newTop}%`,
              rotation: newRotation,
            });
          } else {
            gsap.set(card, {
              top: "150%",
              rotation: startRotations[index],
            });
          }
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      <ReactLenis root>
        {/* <div className=" h-full absolute inset-0 -z-10 w-full">
          <Canvas
              camera={{
                position: [10, 10, 10],
                fov: 200,
                aspect: window.innerWidth / window.innerHeight,
                near: 0.1,
                far: 1000,
              }}
              style={{ width: "100%", height: "100%" }}
          >
            <directionalLight position={[1, 1, 1]} intensity={2} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 5, 10]} intensity={2} />
            <spotLight
              position={[0, 50, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            
            <hemisphereLight
              skyColor="#b1e1ff"
              groundColor="#000000"
              intensity={1}
            />
            <Sky />
          </Canvas>
        </div> */}
        <section className="hero">
          <div className=" heading-section">
            <div className="heading-title ">  
              <div
                // style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
                className="heading-letters"
              >
                <div
                  className={`letter wave `}
                  // style={{animationDelay: "0s"}}
                >
                  H
                </div>
                <div
                  className={`letter wave`}
                  // style={{animationDelay: "1s"}}

                >
                  I
                </div>
                <div
                  className={`letter wave`}
                  // style={{animationDelay: "2s"}}

                >
                  D
                </div>
                <div
                  className={`letter wave`}
                  // style={{animationDelay: "3s"}}

                >
                  E
                </div>
                <div
                  className={`letter wave`}
                  // style={{animationDelay: "4s"}}

                >
                  O
                </div>
                <div
                  className={`letter wave`}
                  // style={{animationDelay: "5s"}}

                >
                  U
                </div>
                <div
                  className={`letter wave`}
                  // style={{animationDelay: "6s"}}

                >
                  S
                </div>
              </div>
              <div
                // style={{ fontFamily: "'Fontdiner Swanky', cursive" }}
                className=" heading-letters"
              >
                <div
                  className={`letter wave`} 
                  // style={{animationDelay: "7s"}}
                >
                  G
                </div>
                <div
                  className={`letter wave `}
                  // style={{animationDelay: "8s"}}

                >
                  I
                </div>
                <div
                  className={`letter wave `}
                  // style={{animationDelay: "9s"}}

                >
                  F
                </div>
                <div
                  className={`letter wave `}
                  // style={{animationDelay: "10s"}}

                >
                  T
                </div>
                <div
                  className={`letter wave `}
                  // style={{animationDelay: "11s"}}

                >
                  S
                </div>
              </div>

              
            </div>
          </div>
          <div className="w-full">
            <Canvas style={{height: "25rem"}}>
              <Gift/>
            </Canvas>
          </div>
          <div className="hero-copy">
            <div className="hero-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elitQuisque
              neque justo.  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </div>
            <button className="pushable">
              <span className="front">Create Yours Today</span>
            </button>
          </div>
        </section>
        <section className="pinned" ref={pinnedSectionRef}>
          <div className="sticky-header" ref={stickyHeaderRef}>
            <h1>How it works</h1>
          </div>
          <ProgressBar ref={progressBarRef} progressRef={progressRef} />
          <Indices
            ref={indicesContainerRef}
            setIndicesRef={(el, index) => (indicesRef.current[index] = el)}
          />

          {cardsData.map((card, index) => (
            <Card
              key={card.id}
              {...card}
              ref={(el) => (cardsRef.current[index] = el)}
            />
          ))}
        </section>
        <section className="footer">
          <h1>Create Yours Today</h1>
        </section>
      </ReactLenis>
    </>
  );
}
