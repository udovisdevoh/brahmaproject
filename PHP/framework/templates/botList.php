<ul class="BotList">
	<?php foreach ($aiUnitList as $aiUnit): ?>
	<li>
		<a href="./bot.php?ai=<?php echo $aiUnit['key_name'] ?>"><?php echo $aiUnit['name'] ?></a>
		rating: <?php echo $aiUnit['rating'] ?>
	</li>
	<?php endforeach ?>
</ul>