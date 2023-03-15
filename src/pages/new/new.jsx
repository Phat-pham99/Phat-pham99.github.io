import React,{ useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";
const App = () => {
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div>
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={{
                fullScreen: {
                    enable: true,
                    zIndex: -1
                  },
                background: {
                        image: "url('https://particles.js.org/images/background3.jpg')"
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 2,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    number: {
                      value: 200,
                      limit: 300,
                      density: {
                        enable: true,
                        value_area: 800
                      }
                    },
                    color: {
                      value: "#ffffff"
                    },
                    shape: {
                      type: "circle",
                      stroke: {
                        width: 0,
                        color: "#000000"
                      },
                      polygon: {
                        nb_sides: 5
                      },
                      image: {
                        src: "images/github.svg",
                        width: 100,
                        height: 100
                      }
                    },
                    opacity: {
                      value: 0.5,
                      random: true,
                      anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.5,
                        sync: false
                      }
                    },
                    size: {
                      value: 30,
                      random: true,
                      anim: {
                        enable: true,
                        speed: 10,
                        size_min: 10,
                        sync: false
                      }
                    },
                    line_linked: {
                      enable: true,
                      distance: 100,
                      color: "#ffffff",
                      opacity: 1,
                      width: 1
                    },
                    move: {
                      enable: true,
                      speed: 3,
                      direction: "none",
                      random: false,
                      straight: false,
                      out_mode: "out",
                      bounce: false,
                      attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                      }
                    }
                  },
                backgroundMask: {
                    enable: true,
                    cover: {
                      color: {
                        value: {
                          r: 0,
                          g: 0,
                          b: 0
                        }
                      }
                    }
                  },
                detectRetina: true,
            }}
        />
        </div>
    );
};
export default App;