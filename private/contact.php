                               
<?php
/*---------------------------------------------------------------*/
/*
    Titre : Formulaire complet d'envoi de mail                                                                            
                                                                                                                          
    URL   : https://phpsources.net/code_s.php?id=57
    Auteur           : Mathieu                                                                                            
    Date édition     : 01 Sept 2004                                                                                       
    Date mise à jour : 13 Sept 2019                                                                                      
    Rapport de la maj:                                                                                                    
    - refactoring du code en PHP 7                                                                                        
    - fonctionnement du code vérifié                                                                                    
    - correction du code                                                                                                  
    - amélioration du code                                                                                               
    - modification de la description                                                                                      
*/
/*---------------------------------------------------------------*/?>
     <form name="contact_form" method="post" action="">
    <table width="500">
    <tr>
     <td valign="top">
      <label for="name">Votre Nom et Prénom *</label>
     </td>
     <td valign="top">
      <input  type="text" name="name" maxlength="50" size="30" value="<?php if (
isset($_POST['name'])) echo htmlspecialchars($_POST['name']);?>">
     </td>
    </tr>
    <tr>
     <td valign="top">
      <label for="email">Email *</label>
     </td>
     <td valign="top">
      <input  type="text" name="email" maxlength="80" size="30" value="<?php if 
(isset($_POST['email'])) echo htmlspecialchars($_POST['email']);?>">
     </td>
    </tr> 
    <tr>
     <td valign="top">
      <label for="tel">Téléphone *</label>
     </td>
     <td valign="top">
      <input  type="text" name="tel" maxlength="30" size="30" value="
      <?php if (isset($_POST['tel'])) echo htmlspecialchars($_POST['tel']);?>">
     </td>
    </tr>
    <tr>
     <td valign="top"">
      <label for="company">Votre Projet concerne ? </label>
     </td>
     <td valign="top">
      <input  type="text" name="company" maxlength="50" size="30" value="<?php if
 (isset($_POST['company'])) echo htmlspecialchars($_POST['company']);?>">
     </td>
    </tr>
    <tr>
     <td valign="top">
      <label for="project">Expliquez nous votre projet *</label>
     </td>
     <td valign="top">
      <textarea  name="project" cols="28" rows="10"><?php if (isset($_POST[
'msg'])) echo htmlspecialchars($_POST['project']);?></textarea>
     </td>
    </tr>
    <tr>
     <td valign="top">
      <label for="msg">Expliquez nous votre projet *</label>
     </td>
     <td valign="top">
      <textarea  name="msg" cols="28" rows="10"><?php if (isset($_POST[
'msg'])) echo htmlspecialchars($_POST['msg']);?></textarea>
     </td>
    </tr>

    <tr>
     <td colspan="2" style="text-align:center">
      <input type="submit" value=" Envoyer ">
     </td>
    </tr>
    </table>
    </form>

<?php
if(isset($_POST['email'])) {
 
    // EDIT THE 2 LINES BELOW AS REQUIRED
    $email_to = "vinc.charles0@gmail.com";
    $email_subject = "Test";
 
    function died($error) {
        // your error code can go here
        echo 
"Nous sommes désolés, mais des erreurs ont été détectées dans le" .
" formulaire que vous avez envoyé. ";
        echo "Ces erreurs apparaissent ci-dessous.<br /><br />";
        echo $error."<br /><br />";
        echo "Merci de corriger ces erreurs.<br /><br />";
        die();
    }
 
 
    // si la validation des données attendues existe
     if(!isset($_POST['nom']) ||
        !isset($_POST['prenom']) ||
        !isset($_POST['email']) ||
        !isset($_POST['telephone']) ||
        !isset($_POST['commentaire'])) {
        died(
'Nous sommes désolés, mais le formulaire que vous avez soumis semble poser' .
' problème.');
    }
 
     
 
    $nom = $_POST['nom']; // required
    $prenom = $_POST['prenom']; // required
    $email = $_POST['email']; // required
    $telephone = $_POST['telephone']; // not required
    $commentaire = $_POST['commentaire']; // required
 
    $error_message = "";
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
 
    if(!preg_match($email_exp,$email)) {
      $error_message .= 
'L\'adresse e-mail que vous avez entrée ne semble pas être valide.<br />';
    }
   
      // Prend les caractères alphanumériques + le point et le tiret 6
      $string_exp = "/^[A-Za-z0-9 .'-]+$/";
   
    if(!preg_match($string_exp,$nom)) {
      $error_message .= 
'Le nom que vous avez entré ne semble pas être valide.<br />';
    }
   
    if(!preg_match($string_exp,$prenom)) {
      $error_message .= 
'Le prénom que vous avez entré ne semble pas être valide.<br />';
    }
   
    if(strlen($commentaire) < 2) {
      $error_message .= 
'Le commentaire que vous avez entré ne semble pas être valide.<br />';
    }
   
    if(strlen($error_message) > 0) {
      died($error_message);
    }
 
    $email_message = "Détail.\n\n";
    $email_message .= "Nom: ".$nom."\n";
    $email_message .= "Prenom: ".$prenom."\n";
    $email_message .= "Email: ".$email."\n";
    $email_message .= "Telephone: ".$telephone."\n";
    $email_message .= "Commentaire: ".$commentaire."\n";
 
    // create email headers
    $headers = 'From: '.$email."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();
    mail($email_to, $email_subject, $email_message, $headers);
    ?>
     
    <!-- mettez ici votre propre message de succès en html -->
     
    Merci de nous avoir contacter. Nous vous contacterons très bientôt.
     
    <?php

    }

