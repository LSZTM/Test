# app.py
# A Zero-Cost Streamlit App for "Codebreaker: The Badge Quest"
# Built to be deployed on Streamlit Community Cloud without external databases or paid services.

import streamlit as st
from PIL import Image, ImageDraw, ImageFont
import random
from io import BytesIO
import textwrap

# --- Configuration & Setup ---

# Ensure all session state variables are initialized
if 'stage' not in st.session_state:
    st.session_state.stage = 'start'
if 'completed_puzzles' not in st.session_state:
    st.session_state.completed_puzzles = 0
if 'user_name' not in st.session_state:
    st.session_state.user_name = ""
if 'puzzles_to_show' not in st.session_state:
    # Randomly select a set of puzzles to show for this session
    all_puzzles = [
        {
            "question": "What does 'git' primarily manage?",
            "options": ["G-force", "Version control", "Internet traffic", "Graphics rendering"],
            "answer": "Version control",
            "explanation": "Git is a distributed version-control system for tracking changes in source code during software development."
        },
        {
            "question": "Which of these is a popular data visualization library in Python?",
            "options": ["Django", "Flask", "Matplotlib", "React"],
            "answer": "Matplotlib",
            "explanation": "Matplotlib is a comprehensive library for creating static, animated, and interactive visualizations in Python."
        },
        {
            "question": "In web development, what does CSS stand for?",
            "options": ["Creative Style Sheets", "Cascading Style Sheets", "Computer System Syntax", "Custom Server Scripts"],
            "answer": "Cascading Style Sheets",
            "explanation": "CSS is a style sheet language used for describing the presentation of a document written in a markup language like HTML."
        },
        {
            "question": "What is the primary function of a machine learning model?",
            "options": ["To mine cryptocurrencies", "To create a user interface", "To learn from data and make predictions", "To manage a database"],
            "answer": "To learn from data and make predictions",
            "explanation": "The primary function of an ML model is to analyze data, find patterns, and make intelligent decisions or predictions based on those patterns."
        },
        {
            "question": "What is the purpose of the 'blockchain' in cryptocurrency?",
            "options": ["To speed up transactions", "To act as a public, decentralized ledger", "To encrypt user data", "To generate random numbers"],
            "answer": "To act as a public, decentralized ledger",
            "explanation": "A blockchain is a decentralized and distributed digital ledger that is used to record transactions across many computers."
        },
    ]
    # Randomly select 3 puzzles for the current quest
    st.session_state.puzzles_to_show = random.sample(all_puzzles, 3)

# --- Functions for App Logic ---

def next_puzzle():
    """Moves the app to the next puzzle or to the name input stage."""
    st.session_state.completed_puzzles += 1
    if st.session_state.completed_puzzles >= len(st.session_state.puzzles_to_show):
        st.session_state.stage = 'name_input'
    # Force a re-run to update the UI
    st.rerun()

def generate_badge(name, template_path="badge_template.png"):
    """
    Generates a personalized badge image with the user's name.
    
    Args:
        name (str): The name to be printed on the badge.
        template_path (str): The path to the badge template image.
        
    Returns:
        BytesIO: An in-memory file-like object of the generated image.
    """
    try:
        badge_img = Image.open(template_path).convert("RGBA")
    except FileNotFoundError:
        st.error("Badge template not found. Please ensure 'badge_template.png' is in the same directory.")
        return None
    
    # Create a drawing object
    draw = ImageDraw.Draw(badge_img)
    
    # Define font and text properties
    font_path = "arial.ttf"  # You might need to change this path or use a system font.
    try:
        # Use a true-type font for better rendering
        font_size = 60
        font = ImageFont.truetype(font_path, font_size)
    except IOError:
        # Fallback to a default font if the specified font is not found
        st.warning("Arial font not found. Using default font.")
        font = ImageFont.load_default()
        font_size = 24
        
    # Text wrapping for long names
    wrapped_name = "\n".join(textwrap.wrap(name, width=20))
    
    # Get text size
    text_width, text_height = draw.textsize(wrapped_name, font=font)
    
    # Center the text
    image_width, image_height = badge_img.size
    x = (image_width - text_width) / 2
    y = (image_height / 2) + 50 # Adjust position as needed
    
    # Draw the text with a shadow for better visibility
    draw.text((x + 2, y + 2), wrapped_name, font=font, fill=(0, 0, 0, 100)) # Shadow
    draw.text((x, y), wrapped_name, font=font, fill=(255, 255, 255, 255)) # White text
    
    # Save the image to a BytesIO object
    img_byte_arr = BytesIO()
    badge_img.save(img_byte_arr, format='PNG')
    img_byte_arr.seek(0)
    
    return img_byte_arr

def create_social_share_links(name):
    """Generates pre-populated social sharing URLs."""
    message = f"I just earned my Codebreaker digital badge at the Project Club's event! Check it out! My name is {name}."
    
    # LinkedIn post with pre-populated text (URL-encoded)
    linkedin_url = f"https://www.linkedin.com/shareArticle?mini=true&url=&title=Codebreaker Badge Quest&summary={message}"
    
    # Instagram doesn't support pre-populated posts directly, so a placeholder is used.
    # It's common to encourage users to copy the text.
    instagram_text = f"I just earned my Codebreaker digital badge at the Project Club's event! #Codebreaker #ProjectClub #TechBadge #CampusEvent"
    
    return linkedin_url, instagram_text

# --- Streamlit UI Components & Logic ---

st.set_page_config(
    page_title="Codebreaker: The Badge Quest",
    page_icon="🤖",
    layout="centered"
)

st.title("🤖 Codebreaker: The Badge Quest")
st.markdown("A Project Club Event Challenge")

# Handle the different stages of the application
if st.session_state.stage == 'start':
    st.write("""
        Welcome, future innovator! Scan the QR code, and you're here.
        Ready to take on the Codebreaker challenge? Answer a few quick questions
        to prove your tech knowledge and earn your personalized digital badge!
    """)
    if st.button("Start the Quest!", use_container_width=True):
        st.session_state.stage = 'puzzles'
        st.rerun()

elif st.session_state.stage == 'puzzles':
    current_puzzle_index = st.session_state.completed_puzzles
    
    if current_puzzle_index < len(st.session_state.puzzles_to_show):
        puzzle = st.session_state.puzzles_to_show[current_puzzle_index]
        
        st.subheader(f"Puzzle {current_puzzle_index + 1} of {len(st.session_state.puzzles_to_show)}")
        st.markdown(f"**Question:** {puzzle['question']}")
        
        # Display buttons for each option
        col1, col2 = st.columns(2)
        columns = [col1, col2]
        
        for i, option in enumerate(puzzle['options']):
            with columns[i % 2]:
                if st.button(option, key=f"puzzle_{current_puzzle_index}_{i}", use_container_width=True):
                    if option == puzzle['answer']:
                        st.success("Correct!")
                        st.write(f"**Explanation:** {puzzle['explanation']}")
                        st.button("Next Challenge", on_click=next_puzzle, use_container_width=True)
                    else:
                        st.error("Incorrect. Try again!")
    else:
        st.session_state.stage = 'name_input'
        st.rerun()

elif st.session_state.stage == 'name_input':
    st.subheader("🎉 You've Completed the Challenges!")
    st.write("Now, enter your name to personalize your badge.")
    
    user_name_input = st.text_input(
        "Enter your full name:",
        max_chars=30,
        placeholder="e.g., Jane Doe"
    )
    
    if st.button("Generate My Badge!", use_container_width=True):
        if user_name_input:
            st.session_state.user_name = user_name_input
            st.session_state.stage = 'badge'
            st.rerun()
        else:
            st.warning("Please enter your name to proceed.")

elif st.session_state.stage == 'badge':
    st.balloons()
    st.subheader("🌟 Your Codebreaker Badge is Here!")
    st.write(f"Congratulations, {st.session_state.user_name}!")
    
    # Generate the badge and display it
    badge_image_bytes = generate_badge(st.session_state.user_name)
    if badge_image_bytes:
        st.image(badge_image_bytes, use_column_width=True)
        
        st.markdown("### Share Your Achievement!")
        linkedin_url, instagram_text = create_social_share_links(st.session_state.user_name)
        
        st.link_button("Share on LinkedIn", url=linkedin_url, use_container_width=True)
        st.write("---")
        st.markdown(f"""
        **For Instagram:**
        * Take a screenshot of your badge.
        * Use the text below in your post or story!
        
        ```
        {instagram_text}
        ```
        """)
    
    if st.button("Restart the Quest", use_container_width=True):
        # Reset session state for a new quest
        for key in list(st.session_state.keys()):
            del st.session_state[key]
        st.rerun()
