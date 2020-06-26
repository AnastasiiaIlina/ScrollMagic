$(function () { // wait for document ready
    const controller = new ScrollMagic.Controller({
        globalSceneOptions: {
            duration: $('section').height(), // сцена длиться пока скролинг не достигнет высоты секции
            triggerHook: .025,
            reverse: true
        }
    });

    // scene_object = {
    //     '[scene-name]' : {
    //         '[target-scene-id]' : '[anchor-id]'
    //     }
    // }

    const scenes = {
        scene1: {
            'section-1': 'anchor-1'
        },
        scene2: {
            'section-2': 'anchor-2'
        }
    }

    for(let key in scenes) {
        // skip loop if the property is from prototype
        if (!scenes.hasOwnProperty(key)) continue;
        const obj = scenes[key];

        for (let prop in obj) {
            // skip loop if the property is from prototype
            if(!obj.hasOwnProperty(prop)) continue;

            new ScrollMagic.Scene({ triggerElement: '#' + prop })
                .setClassToggle('#' + obj[prop], 'active')
                .addTo(controller);
        }
    }

    // Change behaviour of controller
// to animate scroll instead of jump
    controller.scrollTo(function(target) {
        TweenMax.to(window, 0.5, {
            scrollTo : {
                y : target,
                autoKill : true // Allow scroll position to change outside itself
            },
            ease : Cubic.easeInOut
        });
    });

    //  Bind scroll to anchor links using Vanilla JavaScript
    var anchor_nav = document.querySelector('nav');
    console.log(anchor_nav)

    anchor_nav.addEventListener('click', function(e) {
        var target = e.target,
            id     = target.getAttribute('href');

        if(id !== null) {
            if(id.length > 0) {
                e.preventDefault();
                controller.scrollTo(document.querySelector(id));

                if(window.history && window.history.pushState) {
                    history.pushState("", document.title, id);
                }
            }
        }
    });












    // var tl = new TimelineMax();
    // tl.fromTo(
    //     ".section.two",
    //     1,
    //     { xPercent: 100 },
    //     { xPercent: 0, ease: Linear.easeNone },
    //     "+=1"
    // );
    // tl.fromTo(
    //     ".section.three",
    //     1,
    //     { yPercent: 100 },
    //     { yPercent: 0, ease: Linear.easeNone },
    //     "+=1"
    // );
    //
    // new ScrollMagic.Scene({
    //     triggerElement: "#pin-1",
    //     triggerHook: "onLeave",
    //     duration: "300%"
    // })
    //     .setPin("#pin-1")
    //     .setTween(tl)
    //     .addTo(controller);

});