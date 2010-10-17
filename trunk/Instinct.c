//Isa AND SomeAre
[pine] isa [tree] = [tree] someare [pine];
conservative_thinking someare;
if ([pine] isa [tree])
{
	[tree] cant someare [pine];
}

if ([pine] isa [tree] && [tree] isa [plant])
{
	[pine] isa [plant];
}

if ([animal] contradict [plant])
{
	[animal] cant isa [plant];
}

if ([pine] madeof [wood])
{
	[wood] unlikely isa [pine];
}

if ([tree] madeof [wood])
{
	[tree] unlikely isa [wood];
}

if ([pine] [madeof] [wood] && [wood] isa [material])
{
	[pine] [madeof] [material];
}

if ([pine] isa [tree] && [tree] [madeof] [wood])
{
	[pine] [madeof] [wood];
}

/*
//not sure if it's useful
if ([homo_ergaster] isa [hominid])
{
	[homo_ergaster] allwas [hominid];
}
*/


//MadeOf AND PartOf
[tree] madeof [wood] = [wood] partof [tree];
if ([pine] madeof [wood] && [wood] madeof [carbon])
{
	[pine] madeof [carbon];
}

if ([tree] madeof [wood])
	[tree] unlikely partof [wood];

if ([pine] isa [tree])
	[pine] unlikely madeof [tree];

if ([tree] someare [pine])
	[tree] unlikely madeof [pine];

/*
//Recently removed
if ([big_mac] madeof [trans_fat] && [trans_fat] destroy [lifeform])
{
	[big_mac] destroy [lifeform];
}
*/


//Contradict
[black] contradict [white] = [white] contradict [black];


//Need and allow
[life] need [water] = [water] allow [life];
if ([bird] need [tree] && [tree] need [light])
{
	[bird] need [light];
}

if ([bird] need [tree] && [tree] isa [lifeform])
{
	[bird] need [lifeform];
}

if ([crow] isa [bird] && [bird] need [tree])
{
	[crow] need [tree];
}

if ([sergy] make [google] && [google] originof [gmail])
{
	[sergy] allow [gmail];
}

/*
//Not sure
if ([joe] madeof [cancer] && [cancer] madeof [cancerous_cell])
{
	[joe] need [cancerous_cell];
}

//Not sure
if ([bird] need [tree] && [tree] madeof [tree_disease])
{
	[bird] need [tree_disease];
}*/


//Make AND MadeBy
[mother] make [baby] = [baby] madeby [mother];
if ([daughter] madeby [mother])
{
	[daughter] cant make [mother];
}

if ([grandmother] make [mother] && [mother] make [daughter])
{
	[grandmother] make [daughter];
}

if ([mozart] make [music] && [music] isa [art])
{
	[mozart] make [art];
}

if ([mom] isa [mother] && [mother] make [child])
{
	[mom] make [child];
}


//Promote AND Promotedby
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


//Was and Become
[ape_species] somebecome [human_species] = [human_species] somewas [ape_species];
if ([human_body] allbecome [corpse])
{
	[human_body] somebecome [corpse];
}

if ([human_species] allwas [ape_species])
{
	[human_species] somewas [ape_species];
}

if ([adult] allwas [child] && [child] allwas [baby])
{
	[adult] allwas [baby];
}

if ([human] madeof [flesh])
{
	[human] unlikely somewas [flesh];
}

if ([human] madeof [flesh])
{
	[human] unlikely somebecome [flesh];
}

/*
//not sure
if (child become adult)
{
	THEN child CANT was adult;
}
*/


//destroy and destroyedBy
[pollution] destroy [earth] = [earth] destroyedby [pollution];
if ([pollution] destroy [earth] && [me] need [earth])
{
	[pollution] destroy [me];
}

if ([car] make [pollution] && [pollution] destroy [me])
{
	[car] destroy [me];
}

/*
//Not sure
if ([earth] madeof [nature] && [gm] destroy [nature])
{
	[gm] destroy [earth];
}
*/

if ([pollution] destroy [nature])
{
	[pollution] unlikely allow [nature];
}

/*
//Create some inconsistency bug... must be fixed
if ([dogma] destroy [critical_thinking] && [critical_thinking] synergize [intelligence])
{
	[dogma] destroy [intelligence];
}
*/


//From and originof
[grunge] from [seattle] = [seattle] originof [grunge];
if ([grunge] from [seattle] && [seattle] partof [usa])
{
	[grunge] from [usa];
}

if (dragon_ball isa manga && manga from japan)
{
	dragon_ball from japan;
}


//student in school = school placeof student
indian synergize nature = nature synergize indian
muslim antagonize jew = jew antagonize muslim
earth largerthan moon = moon smallerthan earth
pope own catholicism = catholicism ownedby pope
vertebrate without exoskeleton = exoskeleton notpartof vertebrate

/*//In and PlaceOf
IF pine madeof wood THEN pine placeof wood
IF school placeof student THEN school UNLIKELY in student//Used to be "cant"
IF pine isa tree THEN pine UNLIKELY placeof tree//Used to be "cant"
IF tree someare pine THEN tree UNLIKELY placeof pine//Used to be "cant"
IF city placeof school AND school placeof student THEN city placeof student
IF school isa building AND building placeof people THEN school placeof people
IF school placeof student AND student isa person THEN school placeof person*/


//Contradict
IF human isa animal THEN human CANT contradict animal
IF human isa animal AND animal contradict plant THEN human contradict plant

//Synergize
IF me synergize nature THEN me cant destroy nature
IF me isa indian AND indian synergize nature THEN me synergize nature

//Antagonize
IF me isa jew AND jew antagonize muslim THEN me antagonize muslim
IF me antagonize jew THEN me unlikely isa jew
IF me antagonize jew THEN me unlikely allow jew
IF me antagonize jew THEN me cant synergize jew
IF walmart make cheap_labour AND cheap_labour antagonize social_justice THEN walmart antagonize social_justice

//Largerthan and smallerthan
IF sun largerthan earth AND earth largerthan moon THEN sun largerthan moon
//IF sun isa star AND star largerthan planet THEN sun largerthan planet
//IF earth isa planet AND planet smallerthan sun THEN earth smallerthan sun

//Own and ownedby
IF catholic isa christian AND christian ownedby christianism THEN catholic ownedby christianism
IF dalai_lama own buddhism AND buddhism own buddhist THEN dalai_lama own buddhist
IF joe isa hat_wearer AND hat_wearer own hat THEN joe own hat

//Without and notpartof
IF insect madeof exoskeleton THEN insect cant without exoskeleton
IF joe without tooth AND tooth someare molar THEN joe without molar
IF invertebrate without vertebrate_column AND invertebrate someare arthropod THEN arthropod without vertebrate_column