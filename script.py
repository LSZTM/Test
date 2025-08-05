# Let's create a comprehensive data structure for the Codebreaker challenge application
import json
import random

# Sample data for different puzzle types and tech trivia questions
puzzle_data = {
    "logic_puzzles": [
        {
            "id": 1,
            "type": "visual_bug",
            "title": "Find the Bug",
            "description": "Look at this code snippet and identify the syntax error",
            "code": "for i in range(10)\n    print(i)",
            "correct_answer": "Missing colon after range(10)",
            "options": ["Missing colon", "Wrong indentation", "Missing parentheses", "Variable error"],
            "difficulty": "easy"
        },
        {
            "id": 2,
            "type": "logic_grid",
            "title": "Binary Logic",
            "description": "What is the binary representation of 15?",
            "correct_answer": "1111",
            "options": ["1010", "1111", "1100", "1001"],
            "difficulty": "medium"
        },
        {
            "id": 3,
            "type": "pattern_recognition",
            "title": "Sequence Pattern",
            "description": "Complete the sequence: 2, 4, 8, 16, ?",
            "correct_answer": "32",
            "options": ["24", "32", "28", "30"],
            "difficulty": "easy"
        }
    ],
    
    "tech_trivia": [
        {
            "id": 1,
            "question": "Which programming language is known as the 'mother of all languages'?",
            "correct_answer": "C",
            "options": ["Python", "Java", "C", "Assembly"],
            "category": "Programming Languages",
            "difficulty": "medium"
        },
        {
            "id": 2,
            "question": "What does API stand for?",
            "correct_answer": "Application Programming Interface",
            "options": ["Advanced Programming Interface", "Application Programming Interface", "Automated Program Integration", "Applied Programming Instructions"],
            "category": "Software Development",
            "difficulty": "easy"
        },
        {
            "id": 3,
            "question": "Which company developed the React JavaScript library?",
            "correct_answer": "Facebook",
            "options": ["Google", "Microsoft", "Facebook", "Twitter"],
            "category": "Web Development",
            "difficulty": "easy"
        },
        {
            "id": 4,
            "question": "What is the time complexity of binary search?",
            "correct_answer": "O(log n)",
            "options": ["O(n)", "O(log n)", "O(n²)", "O(1)"],
            "category": "Algorithms",
            "difficulty": "medium"
        },
        {
            "id": 5,
            "question": "Which protocol is used for secure web communication?",
            "correct_answer": "HTTPS",
            "options": ["HTTP", "HTTPS", "FTP", "SMTP"],
            "category": "Networking",
            "difficulty": "easy"
        }
    ],
    
    "word_scrambles": [
        {
            "id": 1,
            "scrambled": "TPYHON",
            "correct_answer": "PYTHON",
            "hint": "Popular programming language with snake logo",
            "category": "Programming Languages"
        },
        {
            "id": 2,
            "scrambled": "TAABAEDS",
            "correct_answer": "DATABASE",
            "hint": "Storage system for organized data",
            "category": "Data Management"
        },
        {
            "id": 3,
            "scrambled": "GORHLITMA",
            "correct_answer": "ALGORITHM",
            "hint": "Step-by-step problem-solving procedure",
            "category": "Computer Science"
        },
        {
            "id": 4,
            "scrambled": "EEAHCMINNLRG",
            "correct_answer": "MACHINELEARNING",
            "hint": "AI subset that learns from data",
            "category": "Artificial Intelligence"
        },
        {
            "id": 5,
            "scrambled": "KLOIANDHCBC",
            "correct_answer": "BLOCKCHAIN",
            "hint": "Decentralized ledger technology",
            "category": "Emerging Tech"
        }
    ],
    
    "drag_drop_code": [
        {
            "id": 1,
            "title": "Complete the Python Function",
            "description": "Arrange the code blocks to create a function that prints 'Hello World'",
            "code_blocks": ["def hello():", "print('Hello World')", "hello()", "    "],
            "correct_order": [0, 3, 1, 2],
            "difficulty": "easy"
        },
        {
            "id": 2,
            "title": "For Loop Structure",
            "description": "Create a proper for loop that prints numbers 1 to 5",
            "code_blocks": ["for i in range(1, 6):", "print(i)", "    "],
            "correct_order": [0, 2, 1],
            "difficulty": "medium"
        }
    ]
}

# Badge configurations with different achievement criteria
badges_config = {
    "speed_coder": {
        "name": "Speed Coder",
        "description": "Completed all challenges in under 60 seconds",
        "icon": "⚡",
        "criteria": {"time_limit": 60, "completion_rate": 100}
    },
    "tech_guru": {
        "name": "Tech Guru", 
        "description": "Answered all tech trivia questions correctly",
        "icon": "🧠",
        "criteria": {"trivia_accuracy": 100}
    },
    "puzzle_master": {
        "name": "Puzzle Master",
        "description": "Solved all logic puzzles without hints",
        "icon": "🧩",
        "criteria": {"puzzle_accuracy": 100, "hints_used": 0}
    },
    "code_ninja": {
        "name": "Code Ninja",
        "description": "Perfect completion of all drag-drop challenges",
        "icon": "🥷",
        "criteria": {"code_accuracy": 100}
    },
    "word_wizard": {
        "name": "Word Wizard",
        "description": "Unscrambled all words correctly",
        "icon": "📝",
        "criteria": {"word_accuracy": 100}
    },
    "bronze_challenger": {
        "name": "Bronze Challenger",
        "description": "Completed the basic challenge",
        "icon": "🥉",
        "criteria": {"completion_rate": 50}
    },
    "silver_achiever": {
        "name": "Silver Achiever", 
        "description": "Completed challenge with good performance",
        "icon": "🥈",
        "criteria": {"completion_rate": 75, "accuracy": 75}
    },
    "gold_champion": {
        "name": "Gold Champion",
        "description": "Excellent performance across all challenges",
        "icon": "🥇",
        "criteria": {"completion_rate": 90, "accuracy": 90}
    }
}

# Social sharing templates
social_sharing = {
    "instagram": {
        "template": "I conquered the Codebreaker challenge at SRM Ramapuram Project Club! 🚀 Got the {badge_name} badge! #SRMProjectClub #CampusCoders #TechChallenge",
        "hashtags": ["#SRMProjectClub", "#CampusCoders", "#TechChallenge", "#CodebreakersChallenge"]
    },
    "linkedin": {
        "template": "Just completed the Codebreaker challenge at SRM Ramapuram Project Club and earned the {badge_name} badge! Excited to be part of this amazing tech community. #SRMProjectClub #TechSkills #StudentAchievement",
        "hashtags": ["#SRMProjectClub", "#TechSkills", "#StudentAchievement", "#ProgrammingChallenge"]
    },
    "twitter": {
        "template": "🎉 Conquered the Codebreaker challenge @SRMProjectClub! Earned {badge_name} badge in {completion_time}s! #SRMProjectClub #CampusCoders",
        "hashtags": ["#SRMProjectClub", "#CampusCoders", "#TechChallenge"]
    }
}

# Generate sample QR codes data (URLs would be actual QR code endpoints)
qr_codes = {
    "challenge_sets": [
        {
            "qr_id": "QR001",
            "challenge_set": "beginner",
            "difficulty": "Easy",
            "estimated_time": "3-5 minutes",
            "url": "https://srm-codebreaker.streamlit.app/?set=beginner&qr=QR001"
        },
        {
            "qr_id": "QR002", 
            "challenge_set": "intermediate",
            "difficulty": "Medium",
            "estimated_time": "5-8 minutes",
            "url": "https://srm-codebreaker.streamlit.app/?set=intermediate&qr=QR002"
        },
        {
            "qr_id": "QR003",
            "challenge_set": "advanced",
            "difficulty": "Hard", 
            "estimated_time": "8-12 minutes",
            "url": "https://srm-codebreaker.streamlit.app/?set=advanced&qr=QR003"
        },
        {
            "qr_id": "QR004",
            "challenge_set": "speed_run",
            "difficulty": "Mixed",
            "estimated_time": "2-3 minutes",
            "url": "https://srm-codebreaker.streamlit.app/?set=speed_run&qr=QR004"
        }
    ]
}

print("Codebreaker Challenge Data Structure Created Successfully!")
print(f"Logic Puzzles: {len(puzzle_data['logic_puzzles'])}")
print(f"Tech Trivia Questions: {len(puzzle_data['tech_trivia'])}")
print(f"Word Scrambles: {len(puzzle_data['word_scrambles'])}")
print(f"Drag-Drop Challenges: {len(puzzle_data['drag_drop_code'])}")
print(f"Available Badges: {len(badges_config)}")
print(f"QR Code Sets: {len(qr_codes['challenge_sets'])}")

# Save the data to JSON files for the Streamlit app
import json

with open('puzzle_data.json', 'w') as f:
    json.dump(puzzle_data, f, indent=2)

with open('badges_config.json', 'w') as f:
    json.dump(badges_config, f, indent=2)
    
with open('social_sharing.json', 'w') as f:
    json.dump(social_sharing, f, indent=2)
    
with open('qr_codes.json', 'w') as f:
    json.dump(qr_codes, f, indent=2)

print("\nJSON files created successfully for the Streamlit application!")