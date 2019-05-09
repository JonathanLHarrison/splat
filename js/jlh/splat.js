/*
	Splat
    An Animated Logo with GSAP
    Jonathan Harrison
    2019
*/

// ready
$(document).ready(function() {

	// elements
    var animationContainer = $("#animationContainer");
    var svg = $("#splatter");
    var blobs = $(".splatter-blob");
    var mainBodyBlobs = $("#splatterMainBlob .splatter-blob");
    var outerBlobs = $("#splatterOuterBlobs .splatter-blob");
    var splatterInPieces = $("#splatterInPieces");
    var splatterPathCutout = $("#splatterPathCutout");
    var cutoutBackground = $("#splatterCutoutBackground");
    var squeegee = $("#splatterSqueegee");
    
    // setup elements
    centerElement(svg);
    TweenMax.staggerTo(blobs, 0, { autoAlpha: 0, scale: 0.5, transformOrigin: "50% 50%" });

    // main timeline
    var tl = new TimelineMax({ delay: 0.3 });
    tl.add("blobs", 0.5);
    tl.add("show squeegee", 0.9);
    tl.add("wipe", 1.75);
    tl.add("squeegee wipe", 1.6);
    tl.add("hide squeegee", 2.3);

    /*
        Animate
    */

    // show container
    tl.to(animationContainer, 0.01, { autoAlpha: 1 }, 0);

    // show blobs
    tl.staggerTo(mainBodyBlobs, 0.05, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" },0.01, "blobs");
    tl.staggerTo(outerBlobs, 0.05, { autoAlpha: 1, scale: 1, transformOrigin: "50% 50%" },0.01, "blobs");

    // replace pieces with whole
    tl.set(splatterPathCutout, { autoAlpha: 1 });
    tl.set(cutoutBackground, { autoAlpha: 1 });
    tl.set(splatterInPieces, { autoAlpha: 0 });

    // wipe
    var wipeDuration = 0.25;
    tl.to(cutoutBackground, wipeDuration, { scaleY: 0, transformOrigin: "0%, 100%", ease: Linear.easeNone }, "wipe");

    // squeegee
    var squeegeWipeDuration = 0.6;
    tl.from(squeegee, 0.5, { x: -10, ease: Back.easeOut.config(0.5) }, "show squeegee");
    tl.to(squeegee, squeegeWipeDuration, { y: "+=26", ease: Back.easeInOut.config(0.7) }, "squeegee wipe");
    tl.to(squeegee, 0.7, { x: 150, ease: Back.easeIn.config(0.5) }, "hide squeegee");

});
// end ready

/*
    Utilities
*/
// place an element at the center of its parent
function centerElement(element, xAxisOnly) {
    if (xAxisOnly) {
        TweenLite.set(element, { left:'50%', xPercent:'-50' });
    }
    else {
        TweenLite.set(element, { left:'50%',top:'50%', xPercent:'-50',yPercent:'-50'});
    }
}
