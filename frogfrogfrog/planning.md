# Planning

## Starting point

The initial idea:

> Frog eating flies

## Experience design

The experience:

> The user controls a frog at the bottom of the screen, they can shoot out the frog's tongue and catch a fly which is moving on the screen. If the tongue hits the fly it gets eaten.

## Breaking it down


Questions:



## The program starts to form....

What is there?


What happens in this project?

- Start (setup)
    - Create a canvas
    
- Every frame (draw)
    - Draw the background
        - Add the fly's speed to it x
        - Draw a circle at the fly's position with its size (black)
    - Move and draw the frog
        - Move the frog to the mouse's x position
        - Draw a green circle at the frog's position with its size
    - Move and draw the tongue
        - Move the tongue
            - If the tongue isn't launched, just do nothing... don't draw it
            - If the tongue is launched, move it up (by its speed)
            - If the tongue is coming back, move it down (by its speed)
            - If the tongue hits the top, send it back down
            - If the tongue gets back to the frog, then stop it

Events

- If the user clicks the mouse
    - If the tongue is still inside the frog's mouth
        - Launch the tongue

