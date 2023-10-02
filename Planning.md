# Detecting a Winning board State in TTT and C4

## TTT

1 make a function that takes in a 2d arr and a X or O and makes a 2d arr that only has the one peice type on it
eg: 
   X O -     T - -
   X - O  =  T - -   (use true and flase for the new arr)
   O X -     - T -

2 Compare if the new 2d arr form step 1 has any hoarazontal winstates in it

    2.a check if any of the 3 arrs have all the indecies true
        (2darr[0][0] && 2darr[0][1] && 2darr[0][2]) || ...

3 Compare if the new 2d arr form step 1 has any vertical winstates in it

    3.a check if in each arr the same index are all true 
        (2darr[0][0] && 2darr[1][0] && 2darr[2][0]) || ...

4 Compare if the new 2d arr form step 1 has any Diaganal winstates in it

    4.a check if onb of the 2 digalnal patterns is in the board
        (2darr[0][0] && 2darr[1][1] && 2darr[2][2]) || (2darr[2][2] && 2darr[1][1] && 2darr[0][0])

5 Return a or statmet with each value

## C4

1 make a function that takes in a 2darr, R or Y, and a arr with 2 values that are the indecees of where the last move was played

2 make a new 2darr of bools that is centered on the last move played. (7x7)

    2.a nested set of loops that check if last tplayed index minus step is lexx than zero or greater than 8 and then sets it to false otherwise moves to next step

    2.b checks each spot and if it has the peice colour that was givent sets it to true otherwise sets it to false

3 comapre to see id the new 2d arr is a horazontal win

    3.a check to see if either side is 4 in a row
        (2darr[2][0] && 2darr[2][1] && 2darr[2][3]) || (2darr[2][1] && 2darr[2][3] && 2darr[2][4])

4 comapre to see it the new 2darr is a vertical win

    4.a check to see if top or bottem is a win
        (2darr[0][2] && 2darr[1][2] && 2darr[3][2]) || (2darr[1][2] && 2darr[3][2] && 2darr[4][2])

5 compare to see if new 2darr is diganal win

    5.a check if L->R is a win
        (2darr[0][0] && 2darr[1][1] && 2darr[3][3]) || (2darr[1][1] && 2darr[3][3] && 2darr[4][4])

    5.b check if R->L is a win
        (2darr[0][4] && 2darr[1][3] && 2darr[3][1]) || (2darr[1][3] && 2darr[3][1] && 2darr[4][0])

6 return a or statement with each value
