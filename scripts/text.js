//Text dump from http://www.gamefaqs.com/nes/563408-dragon-warrior/faqs/54647
var text = {
    format: function (formatString, params) {
        function escapeRegExp(string) {
            return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }

        function replaceAll(string, find, replace) {
            return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
        }

        if (typeof params !== 'undefined') {
            if (typeof params.player_name !== 'undefined') {
                formatString = replaceAll(formatString, "<player_name>", params.player_name);
            }
            if (typeof params.enemy !== 'undefined') {
                formatString = replaceAll(formatString, "<enemy>", params.enemy);
            }
            if (typeof params.number !== 'undefined') {
                formatString = replaceAll(formatString, "<number>", params.number);
            }
        }

        return formatString;
    },
    weapons: {
        "none": "None",
        "bamboo_pole": "Bamboo Pole",
        "club": "Club",
        "copper_sword": "Copper Sword",
        "hand_axe": "Hand Axe",
        "broad_sword": "Broad Sword",
        "flame_sword": "Flame Sword",
        "erdricks_sword": "Erdrick's Sword"
    },
    armors: {
        "none": "None",
        "clothes": "Clothes",
        "leather_armor": "Leather Armor",
        "chain_mail": "Chain Mail",
        "half_plate": "Half Plate",
        "full_plate": "Full Plate",
        "magic_armor": "Magic Armor",
        "erdricks_armor": "Erdrick's Armor"
    },
    shields: {
        "none": "None",
        "leather_shield": "Leather Shield",
        "iron_shield": "Iron Shield",
        "silver_shield": "Silver Shield"
    },
    spells: {
        "heal": "Heal",
        "hurt": "Hurt",
        "sleep": "Sleep",
        "radiant": "Radiant",
        "stopspell": "Stopspell",
        "outside": "Outside",
        "return": "Return",
        "repel": "Repel",
        "healmore": "Healmore",
        "hurtmore": "Hurtmore"
    },
    enemies: {
        "slime": "Slime",
        "red_slime": "Red Slime",
        "drakee": "Drakee",
        "ghost": "Ghost",
        "magician": "Magician",
        "magidrakee": "Magidrakee",
        "scorpion": "Scorpion",
        "druin": "Druin",
        "poltergeist": "Poltergeist",
        "droll": "Droll",
        "drakeema": "Drakeema",
        "skeleton": "Skeleton",
        "warlock": "Warlock",
        "metal_scorpion": "Metal Scorpion",
        "wolf": "Wolf",
        "wraith": "Wraith",
        "metal_slime": "Metal Slime",
        "specter": "Specter",
        "wolflord": "Wolflord",
        "druinlord": "Druinlord",
        "drollmagi": "Drollmagi",
        "wyvern": "Wyvern",
        "rogue_scorpion": "Rogue Scorpion",
        "wraith_knight": "Wraith Knight",
        "golem": "Golem",
        "goldman": "Goldman",
        "knight": "Knight",
        "magiwyvern": "Magiwyvern",
        "demon_knight": "Demon Knight",
        "werewolf": "Werewolf",
        "green_dragon": "Green Dragon",
        "starwyvern": "Starwyvern",
        "wizard": "Wizard",
        "axe_knight": "Axe Knight",
        "blue_dragon": "Blue Dragon",
        "stoneman": "Stoneman",
        "armored_knight": "Armored Knight",
        "red_dragon": "Red Dragon",
        "dragonlord_first_form": "Dragonlord",
        "dragonlord_second_form": "Dragonlord"
    },
    dead: "Thou art dead.",
    combat: {
        cast_blocked: "But that spell hath been blocked.",
        prompt: "Command?",
        player: {
            "attack": "<player_name> attacks!",
            "hit_critical": "Excellent move!",
            "hit": "The <enemy>'s Hit Points have been reduced by <number>.",
            "miss": "The attack failed and there was no loss of Hit Points!",
            "run": "<player_name> started to run away.",
            "run_blocked": "But was blocked in front.",
            "cast": "<player_name> chanted the spell of <spell name>.",
            "cast_sleep": "Thou hast put the <enemy> to sleep.",
            "asleep": "Thou art asleep.",
            "asleep_still": "Thou art still asleep.",
            "awoke": "<player_name> awakes."
        },
        enemy: {
            "near": "A <enemy> draws near!",
            "attack": "The <enemy> attacks!",
            "hit": "Thy Hit Points decreased by <number>.",
            "miss": "A miss! No damage hath been scored!",
            "run": "The <enemy> is running away.",
            "strike_first": "The <enemy> attacked before <player_name> was ready.",
            "dodge": "It is dodging!",
            "asleep": "The <enemy> is asleep.",
            "awoke": "<enemy> hath woken up.",
            "cast": "<enemy> chants the spell of <spell>.",
            "fire": "The <enemy> is breathing fire.",
            "recovered": "The <enemy> hath recovered."
        },
        victory: {
            "defeated": "Thou hast done well in defeating the <enemy>.",
            "gain_exp": "Thy Experience\nincreases by <number>.",
            "gain_gold": "Thy GOLD\nincreases by <number>.",
            "next_level": "Courage and wit have served thee well.\nThou hast been promoted to the next level.",
            "new_spell": "Thou hast learned a new spell."
        }
    },
    menu: {
        "talk_none": "There is no one there.",
        door: {
            "none": "There is no door here.",
            "no_key": "Thou hast not a key to use."
        },
        take: {
            "none": "There is nothing to take here, <player_name>.",
            "gold": "Of GOLD thou hast gained <number>",
            "item": "Fortune smiles upon thee, <player_name>.\nThou hast found the <item>.",
            "empty": "Unfortunately, it is empty.",
            "too_many_items": "If thou would take the <item>, thou must now discard some other item.",
            "want_item": "Dost thou wish to have the <item>?",
            "give_up_item": "Thou hast given up thy <item>.",
            "drop_which": "What shall thou drop?",
            "drop_item": "Thou hast dropped thy <item>.",
            "got_item": "And obtained the <item>.",
            "drop_blocked": "That is much too important to throw away."
        },
        use: {
            "none": "Nothing of use has yet been given to thee.",
            "generic": "<player_name> held the <item> tightly.",
            "herb": "<player_name> used the Herb.",
            "wings": "<player_name> threw The Wings of the Wyvern up into the sky.",
            "wings_blocked": "The Wings of the Wyvern cannot be used here.",
            "scale": "<player_name> donned the scale of the dragon.",
            "scale_twice": "Thou art already wearing the scale of the dragon.",
            "flute": "<player_name> blew the Fairies' Flute.",
            "flute_golem": "Quietly Golem closes his eyes and settles into sleep.",
            "ring": "<player_name> put on the Fighter's Ring.",
            "ring_twice": "<player_name> adjusted the position of the Fighter's Ring.",
            "harp": "<player_name> played a sweet melody on the harp.",
            "rainbow_drop": "<player_name> held the Rainbow Drop toward the sky.\nBut no rainbow appeared here."
        },
        search: {
            "begin": "<player_name> searched the ground all about.",
            "none": "But there found nothing.",
            "treasure": "There is a treasure box.",
            "item": "<player_name> discovers the <item>.",
            "dragonlord_throne": "Feel the wind blowing from behind the throne."
        }
    },
    unknown: {
        //stairs command is stupid; not worth coding it.
        "stairs_none": "There are no stairs here.",
        //not sure if/where these are used (yet)
        "cast_blocked1": "The <enemy>'s spell hath been blocked.",
        "cast_blocked2": "<player_name>'s spell is blocked.",
        "enemy_happy": "<enemy> looks happy."
        //unsorted
        /*
That cannot be used in battle.
The spell will not work.
<player_name> cannot yet use the spell.
Thy MP is too low.
But nothing happened.
REPEL has lost its effect.
A torch can be used only in dark places.
<player_name> sprinkled the Fairy Water over his body.
The Fairy Water has lost its effect.

<player_name> put on the <item> and was cursed!.
Thy body is being squeezed.

The <item> is squeezing thy body.

Thou cannot enter here.

"Thou art strong enough!\nWhy can thou not defeat the Dragonlord?"
"If thou art planning to take a rest, first see King Lorik."
"Good morning.\nThou hast had a good night's sleep I hope."
"I shall see thee again."
"Good morning.\nThou seems to have spent a good night."
"Good night."
"Okay.\nGood-bye, traveler."
"Welcome to the traveler's Inn.\nRoom and board is <number> GOLD per night.\nDost thou want a room?"
"All the best to thee."
"I thank thee.\nWon't thou buy one more bottle?"
"Will thou buy some Fairy Water for <number> GOLD to keep the Dragonlord's \nminions away?"
"I will see thee later."
"Thou hast not enough money."
"I am sorry, but I cannot sell thee anymore."
"Here,take this key.\nDost thou wish to purchase more?"
"Magic keys!\nThey will unlock any door.\nDost thou wish to purchase one for <number> GOLD?"
"I am sorry.\nA curse is upon thy body."
"Thou hast no possessions."
"Wilt thou sell anything else?"
"I cannot buy it."
"Thou said the <item>.\nI will buy thy <item> for <number> GOLD.\nIs that all right?"
"What art thou selling?"
"I will be waiting for thy next visit."
"Dost thou want anything else?"
"Thou cannot hold more Herbs."
"Thou cannot carry anymore."
"Thou hast not enough money."
"The <item>?\nThank you very much."
"What dost thou want?"
"Welcome.\nWe deal in tools.\nWhat can I do for thee?"
"Oh, yes?\nThat's too bad."
"Is that Okay.?"
"We deal in weapons and armor.\nDost thou wish to buy anything today?"
"The <item>?"
"Then I will buy thy <item> for <number> GOLD."
"Sorry.\nThou hast not enough money."
"Dost thou wish to buy anything more?"
"What dost thou wish to buy?"
"I thank thee."
"Please, come again."
"Cursed one, be gone!"
"I am looking for the castle cellar.\nI heard it is not easily found."
"Thou must have a key to open a door."
"To become strong enough to face future trials thou must first battle many \nfoes."
"King Lorik will record thy deeds in his Imperial Scroll so thou may return to \nthy quest later."
"When the sun and rain meet, a Rainbow Bridge shall appear."
"Never does a brave person steal."
"There was a time when Brecconary was a paradise.\nThen the Dragonlord's minions came."

"Let us wish the warrior well!"
"May the light be thy strength!"

"If thy Hit Points are high enough, by all means, enter."
"We are merchants who have traveled much in this land.\nMany of our colleagues have been killed by servants of the Dragonlord."
"Rumor has it that entire towns have been destroyed by the Dragonlord's \nservants."
"Welcome to Tantegel Castle."

"In Garinham,look for the grave of Garin.\nThou must push on a wall of darkness there."

"A word of advice."
"Save thy money for more expensive armor."

"Listen to what people say.\nIt can be of great help."

"Beware the bridges!"
"Danger grows when thou crosses."

"There is a town where magic keys can be purchased."

"Some say that Garin's grave is home to a Silver Harp."
"Enter where thou can."

"Welcome!\nEnter the shop and speak to its keeper across the desk."
"Thou art most welcome in Brecconary."
"Watch thy Hit Points when in the Poisonous Marsh."

"Go north to the seashore, then follow the coastline west until thou hath \nreached Garinham."
"No,I am not Princess Gwaelin."
"Please,save us from the minions of the Dragonlord."
"See King Lorik when thy experience levels are raised."
"Art thou the descendant of Erdrick?\nHast thou any proof?"

"Within sight of Tantegel Castle to the south is Charlock,"
"The fortress of the Dragonlord."

"This bath cures rheumatism."
"East of Hauksness there is a town, 'tis said, where one may purchase weapons \nof extraordinary quality."
"Rimuldar is the place to buy keys."
"Hast thou seen Nester?\nI think he may need help."

"Dreadful is the South Island."
"Great strength and skill and wit only will bring thee back from that place."

"Golem is afraid of the music of the flute, so 'tis said."
"This is the village of Kol."
"In legends it is said that fairies know how to put Golem to sleep."
"The harp attracts enemies.\nStay away from the grave in Garinham."
"I'm too busy.\nAsk the other guard."
"I suggest making a map if thy path leads into the darkness."
"Once there was a town called Hauksness far to the south,but I do not know if \nit still exists."
"I hate people!\nGo! Leave me!"
"They say that Erdrick's armor was hidden long ago."
"Many believe that Princess Gwaelin is hidden away in a cave."
"I have heard of one named Nester.\nDost thou know such a one?"
"Garin, a wandering minstrel of legendary fame, is said to have built this \ntown."
"Welcome to Garinham.\nMay thy stay be a peaceful one."
"It is said that the Princess was kidnapped and taken eastward."
"Come buy my radishes! They are fresh and cheap.\nBuy thy radishes today!"
"To learn how proof may be obtained that thy ancestor was the great Erdrick, \nsee a man in this very town."
"'Tis said that Erdrick's sword could cleave steel."
"Welcome to Cantlin, the castle town."
"What shall I get for thy dinner?"
"I know nothing."
"I'm Nester.\nHey, where am I? No, don't tell me!"
"Grandfather used to say that his friend, Wynn, had buried something of great \nvalue at the foot of a tree behind his shop."

"It is said that many have held Erdrick's armor."
"The last to have it was a fellow named Wynn."

"My Grandfather Wynn once had a shop on the east side of Hauksness."

"Welcome!"

"Who art thou?\nLeave at once or I will call my friends."
"I am Orwick, and I am waiting for my girl friend."
"The scales of the Dragonlord are as hard as steel."

"Over the western part of this island Erdrick created a rainbow."
"'Tis also said that he entered the darkness from a hidden entrance in the room 
of the Dragonlord."

"Thou shalt find the Stones of Sunlight in Tantegel Castle,\nif thou has not found them yet."
"Welcome to the town of Rimuldar."
"No, I have no tomatoes.\nI have no tomatoes today."
"You are <player_name>?\nIt has been long since last we met."
"Good day,I am Howard. Four steps south of the bath in Kol thou shalt find a \nmagic item."
"Before long the enemy will arrive."
"Heed my warning! Travel not to the south for there the monsters are fierce and \nterrible."
"In this world is there any sword that can pierce the scales of the \nDragonlord?"
"Orwick is late again. I'm starving."
"Many have been the warriors who have perished on this quest."
"But for thee I wish success, <player_name>."
"Hast thou found the flute?"
"Hast thou been to the southern island?"

"'Tis said that the Dragonlord hath claws that can cleave iron and fiery breath 
that can melt stone."
"Dost thou still wish to go on?"

"This is a magic place.\nHast thou found a magic temple?"
"When entering the cave, take with thee a torch."
"Go to the town of Cantlin."
"I have heard that powerful enemies live there."
"Thou art truly brave."
"In this temple do the sun and rain meet."
"Howard had it, but he went to Rimuldar and never returned."
"To the south, I believe, there is a town called Rimuldar."
"That is good."
"No one will say thou art afraid."

"Go to the south."

"Where oh where can I find Princess Gwaelin?"

"Thank you for saving the Princess."

"Oh, my dearest Gwaelin!"
"I hate thee, <player_name>."

"Tell King Lorik that the search for his daughter hath failed."
"I am almost gone...."

"Who touches me?"
"I see nothing, nor can I hear."

"Dost thou know about Princess Gwaelin?"

"Half a year now hath passed since the Princess was kidnapped by the enemy."
"Never does the King speak of it, but he must be suffering much."

"<player_name>, please save the Princess."

"Oh, brave <player_name>."

"I have been waiting long for one such as thee."

"Thou hast no business here.
Go away."

"If thou art cursed, come again."

"I will free thee from thy curse."

"Now, go."

"Though thou art as brave as thy ancestor, <player_name>, thou cannot defeat 
the great Dragonlord with such weapons."
"Thou shouldst come here again."

"Finally thou hast obtained it, <player_name>."

"Is that a wedding ring?"
"Thou seems too young to be married."

"All true warriors wear a ring."

"<player_name>'s coming was foretold by legend.\nMay the light shine upon this brave warrior."

"Thou may go and search."
"From Tantegel Castle travel {07}{00} leagues to the south and {04}{00} to the \neast."

"It's a legend."

"Thy bravery must be proven."
"Thus, I propose a test."
"There is a Silver Harp that beckons to the creatures of the Dragonlord."
"Bring this to me and I will reward thee with the Staff of Rain."

"Thou hast brought the harp. Good."

"In thy task thou hast failed. Alas, I fear thou art not the one Erdrick 
predicted would save us."
"Go now!"

"Now the sun and rain shall meet and the Rainbow Drop passes to thy keeping."
"Thou art brave indeed to rescue me, <player_name>."
"I am Gwaelin, daughter of Lorik."
"But thou must."
Princess Gwaelin embraces thee.
"I'm so happy!"

"Forever shall I be grateful for the gift of my daughter returned to her home, \n<player_name>.\nAccept my thanks."
"Now, Gwaelin, come to my side."
Gwaelin then whispers:
"Wait a moment, please.
I would give a present to <player_name>."
"Please accept my love, <player_name>.

"And I would like to have something of thine--a token."
"Please give me thy <item>."

"Even when we two are parted by great distances, I shall be with thee."

"Farewell, <player_name>."
"I love thee, <player_name>."
"Dost thou love me, <player_name>?"

"When thou art finished preparing for thy departure, please see me.\nI shall wait."
"I am greatly pleased that thou hast returned, <player_name>."

"Before reaching thy next level of experience thou must gain <number of 
experience>."

"If thou dies I can bring thee back for another attempt without loss of thy 
deeds to date."

"Goodbye now, <player_name>.
Take care and tempt not the Fates."

"Will thou take me to the castle?"

"Take the Treasure Chest."

"Welcome, <player_name>.
I am the Dragonlord--King of Kings."

"I give thee now a chance to share this world and to rule half of it if thou 
will now stand beside me."
"What sayest thou?
Will the great warrior stand with me?"

"Thou art a fool!"

"Then half of this world is thine, half of the darkness, and...."

Thy journey is over.
Take now a long, long rest.
Hahahaha....

Heed my voice,
"<player_name>, for this is Gwaelin.
To reach the next level thou must raise thy Experience{F0} by <number>.
My hope is with thee.

"From where thou art now, my castle lies{..}

<number> to the north and{..}

<number> to the south and{..}

<number> to the east.

<number> to the west.

"If thou hast collected all the Treasure Chests,
a key will be found."
"Once used, the key will disappear, but the door will be open and thou may pass 
through."

"East of this castle is a town where armor, weapons, and many other items may 
be purchased."
"Return to the Inn for a rest if thou art wounded in battle, <player_name>."
"Sleep heals all."

"Descendant of Erdrick, listen now to my words."
"It is told that in ages past Erdrick fought demons with a Ball of Light."
"Then came the Dragonlord who stole the precious globe and hid it in the 
darkness."
"Now, <player_name>, thou must help us recover the Ball of Light and restore 
peace to our land."
"The Dragonlord must be defeated."
"Take now whatever thou may find in these Treasure Chests to aid thee in thy 
quest."
"Then speak with the guards, for they have much knowledge that may aid thee."
"May the light shine upon thee, <player_name>."

The tablet reads as follows:

 "I am Erdrick and thou art my descendant."
 "Three items were needed to reach the Isle of Dragons, which is south of 
Brecconary."
 "I gathered these items, reached the island, and there defeated a creature of 
great evil."
 "Now I have entrusted the three items to three worthy keepers."
 "Their descendants will protect the items until thy quest leads thee to seek 
them out."
 "When a new evil arises, find the three items, then fight!"

"<player_name>?\nThis is Gwaelin.\nKnow that thou hath reached the final level."

"Death should not have taken thee, <player_name>."
"I will give thee another chance."

Thy power increases by <number>.
Thy Response Speed increases by <number>.
Thy Maximum Hit <points?> increase by <number>.
Thy Maximum Magic <points?> increase by <number>.
"To reach the next level, thy Experience{F0} must increase by <number>."

"Now, go, <player_name>!"

"Thou hast failed and thou art cursed."
"Leave at once!"

"...."

"Really?"

"I am glad thou hast returned.
All our hopes are riding on thee."

"See me again when thy level has increased."

The Dragonlord revealed his true self!

Thou hast found the Ball of Light.
Radiance streams forth as thy hands touch the object and hold it aloft.
Across the land spreads the brilliance until all shadows are banished and peace 
is restored.

"The legends have proven true."
"Thou art indeed of the line of Erdrick."
"It is thy right to rule over this land."
"Will thou take my place?"
<player_name> thought carefully before answering.
"I cannot,"
said <player_name>.
"If ever I am to rule a country, it must be a land that I myself find."

Gwaelin said:\n"Please, wait."

"I wish to go with thee on thy journey."

"May I travel as thy companion?"

"Hurrah!
Hurrah!
Long live <player_name>!"

"Thou hast brought us peace, again."

"Come now, King Lorik awaits."

And thus the tale comes to an end....
unless the dragons return again.

"Will thou tell me now of thy deeds so they won't be forgotten?"
"Thy deeds have been recorded on the Imperial Scrolls of Honor."

"Dost thou wish to continue thy quest?"
"Rest then for awhile."

"Go <player_name>!"

Please push RESET, hold it in, then turn off the POWER.
If you turn the power off first, the Imperial Scroll of Honor containing your \ndeeds may be lost.

Unfortunately, NO deeds were recorded on Imperial Scroll number <number>.

CONGRATULATIONS
THOU HAST RESTORED PEACE UNTO THE WORLD
BUT THERE ARE MANY ROADS YET TO TRAVEL
MAY THE LIGHT SHINE UPON THEE DRAGON WARRIOR
*/
    }
};