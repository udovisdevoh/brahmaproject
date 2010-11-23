<?php if (isset($successMessage)): ?>
	<p class="Success"><?php echo $successMessage ?></p>
<?php else: ?>	
	<h2>Create an account</h2>
	<form class="CreateAccount" method="post" action="./createaccount.bot">
		<fieldset>		
			<?php if (isset($errorMessage)): ?>
				<p class="Error"><?php echo $errorMessage ?></p>
			<?php endif ?>
		
			<div>
				<label for="name">Username</label>
				<input type="text" id="name" name="name" value="<?php echo isset($_POST['name']) ? strip_tags($_POST['name']) : ''; ?>" />
			</div>
			<div>
				<label for="password1">Password (minimum 8 chars, must contain a lower case, a capital, a number and a symbol)</label>
				<input type="password" id="password1" name="password1" value="<?php echo isset($_POST['password1']) ? strip_tags($_POST['password1']) : ''; ?>" />
			</div>
			<div>
				<label for="password2">Password confirmation</label>
				<input type="password" id="password2" name="password2" value="<?php echo isset($_POST['password2']) ? strip_tags($_POST['password2']) : ''; ?>" />
			</div>
			<div>
				<label for="email">Email</label>
				<input type="text" id="email" name="email" value="<?php echo isset($_POST['email']) ? strip_tags($_POST['email']) : ''; ?>" />
			</div>
			<div>
				<label for="first_name">First name</label>
				<input type="text" id="first_name" name="first_name" value="<?php echo isset($_POST['first_name']) ? strip_tags($_POST['first_name']) : ''; ?>" />
			</div>
			<div>
				<label for="last_name">Last name</label>
				<input type="text" id="last_name" name="last_name" value="<?php echo isset($_POST['last_name']) ? strip_tags($_POST['last_name']) : ''; ?>" />
			</div>
		</fieldset>
		<div>
			<input type="submit" name="createAccount" value="Create Account" />
		</div>
	</form>
<?php endif ?>