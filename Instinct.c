﻿//Promote AND Promotedby
[me] promote [music] = [music] promotedby [me];
if ([me] make [music])
{
	[me] promote [music];
}

if ([mcdonalds] make [big_mac] && [big_mac] madeof [trans_fat])
{
	[mcdonalds] promote [trans_fat];
}

if ([mcdonalds] promote [trans_fat] && [trans_fat] isa [fat])
{
	[mcdonalds] promote [fat];
}

/*
//Not sure
if ([earth] madeof [nature] && [gm] destroy [nature])
{
	[gm] destroy [earth];
}
*/

/*//In and PlaceOf
???IF pine madeof wood THEN pine placeof wood???
IF school placeof student THEN school UNLIKELY in student//Used to be "cant"
IF pine isa tree THEN pine UNLIKELY placeof tree//Used to be "cant"
IF tree someare pine THEN tree UNLIKELY placeof pine//Used to be "cant"
IF city placeof school AND school placeof student THEN city placeof student
IF school isa building AND building placeof people THEN school placeof people
IF school placeof student AND student isa person THEN school placeof person*/

//Own and ownedby
IF catholic isa christian AND christian ownedby christianism THEN catholic ownedby christianism
IF dalai_lama own buddhism AND buddhism own buddhist THEN dalai_lama own buddhist
IF joe isa hat_wearer AND hat_wearer own hat THEN joe own hat

//Without and notpartof
IF insect madeof exoskeleton THEN insect cant without exoskeleton
IF joe without tooth AND tooth someare molar THEN joe without molar
IF invertebrate without vertebrate_column AND invertebrate someare arthropod THEN arthropod without vertebrate_column