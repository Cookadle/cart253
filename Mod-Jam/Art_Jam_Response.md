### [The clock never stop?](https://kaim-bit.github.io/cart253/topics/art-jam/template-p5-project/)
>Review of Kai Maquivar Lavers self portrait
___

Without any interaction, only the time goes faster, and you are left with a lovely psycho stare. If you take the cursor out anywhere near the shirt, you're now revealing his flesh, which happen to be his ribcage. After revealing it, I couldn't help being curious on why I seeing red sticks.
Considering the shirt himself was drawn with x/y/width/height variables then a constraint, I understood it was to let the shirt position move depending on the cursor placement.
I applaud the determination to make it work.
So while he calls it complicated and overly ugly, I think if anything the solution needs more polish so that the red lines aren't visible even when the shirt is moving.

The clock function seemed so simple on the surface and that when I took a moment to think, how would I code a clock? Blank mind.
So I looked for into his code, was surprised at the amount of **if (clock.condition)** had to be added for the clock to move this smoothly. If anything, looking at the code first and then the portrait would have made me realize how intricate and well implemented the clock.

I would move up function(draw) at line 308 right under function preload since it's a really long code.


____

### [Look here!](https://yatsukki.github.io/cart253/topic/art-jam/)
>Review of Kerven-Laurent Casimir self portrait
___
I am yet again stared at by a familiar face. I got to praise Kerven for the accuracy of his famous dead fish expression that greet me everyday.  It's always fascinating to see how an artist with an established artstyle will adapt to different mediums while keeping his signature artstyle.I love that I can recognize this as Kerven art ♥️ .
As I move my cursor around, eyes are following me from left to right but no other way. Due to the restricted space of the eyes, I could understand why the pupils only go from left to right. So I went to play around with his code and saw that he added some square skin (line 59), which I removed.
With the skin square removed, the movement of the pupils felt more lively. The eyes could then go lower or higher, as you move the cursor, since now the pupils had more room to move.
While I understand that the square skin was added for stylization, it feels as tough by focusing on style, a more complex interactive feature was restricted due to it.

___

### [Endless purr](https://lannacheck-ops.github.io/cart253/art-jam/template-p5-project/)
>Review of Lanna Check self moew
___
After reading the detailed read me of Lana, I prepared myself to pet that cat.
Lana self-expression of self is an adorable cat, who also rock the same hairstyle Lana rocks daily.
Keeping her individuality by integrating one of her core self element (hair) into the cat was a beautiful choice.
As I pet that cat, I realized that no matter what I click on my mouse I am still petting him, contrary to what the read me says:
>[Press and hold the left mouse button over the cat's head while moving the mouse to pet the cat.](https://github.com/lannacheck-ops/cart253/tree/main/art-jam/template-p5-project#controls)


Which I think could have been implemented in the massage function with something like:
```
 if (mouseIsPressed) {
    if (mouseButton === LEFT) {
    }
};
```

So depending on which side is clicked, you are doing different actions with the mouse. If Lana were to keep working on this one in the future, I could see even more controls added, and attributing to specific controls would make increase the complexity of the kitty.
But beyond that Lana work has clearly had a lot of work and thoughts put into it, I have many questions to ask her as I am fascinated by her train of thoughts 

___

