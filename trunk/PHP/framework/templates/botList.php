<ul class="BotList">
	<?php foreach ($aiUnitList as $aiUnit): ?>
	<li>
		<p><a href="./?ai=<?php echo $aiUnit['key_name'] ?>"><?php echo $aiUnit['name'] ?></a></p>
		<p>rating: <?php echo $aiUnit['rating'] ?></p>
	</li>
	<?php endforeach ?>
</ul>