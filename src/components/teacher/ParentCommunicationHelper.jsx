import React, { useState } from 'react';
import { useToast } from '../Toast';
import { MessageSquare, Copy } from 'lucide-react';

export default function ParentCommunicationHelper() {
  const toast = useToast();
  const [quickNote, setQuickNote] = useState('');
  const [language, setLanguage] = useState('english');
  const [generatedMessage, setGeneratedMessage] = useState('');

  const mockMessages = {
    english: `Dear Parent,

I hope you are doing well. I am writing to share some important information about your child's progress in my class.

[Your quick note here, formatted in professional language]

I believe that with your support and encouragement at home, we can help your child improve further. Please feel free to contact me if you have any questions or concerns.

Best regards,
[Your Name]
Class Teacher`,
    hindi: `आदरणीय अभिभावक,

मुझे उम्मीद है कि आप अच्छे हैं। मैं आपके बच्चे की कक्षा में प्रगति के बारे में कुछ महत्वपूर्ण जानकारी साझा करने के लिए लिख रहा हूँ।

[आपकी त्वरित नोट यहाँ, पेशेवर भाषा में]

मुझे विश्वास है कि आपके समर्थन और घर पर प्रोत्साहन से हम आपके बच्चे को और भी बेहतर बनाने में मदद कर सकते हैं।

आपका विश्वस्त,
[आपका नाम]
कक्षा शिक्षक`,
    hinglish: `Hii Parents,

I hope aap sab theek ho. Main aapke child ki class mein progress ke baare mein kuch important baatein batana chahta hun.

[Aapka quick note yahan, proper language mein]

Mujhe belief hai ki aapka support aur encourage ghar par se, hamari help se aapka baccha aur bhi improve kar sakta hai.

Agar koi question ho, toh contact kar sakte ho.

Thanks,
[Your Name]
Class Teacher`,
  };

  const handleGenerateMessage = () => {
    if (!quickNote.trim()) {
      toast.warning('Please enter your note');
      return;
    }

    const template = mockMessages[language];
    const message = template.replace('[Your quick note here, formatted in professional language]', quickNote);
    const hindiMessage = template.replace('[आपकी त्वरित नोट यहाँ, पेशेवर भाषा में]', quickNote);
    const hinglishMessage = template.replace('[Aapka quick note yahan, proper language mein]', quickNote);

    if (language === 'english') {
      setGeneratedMessage(message);
    } else if (language === 'hindi') {
      setGeneratedMessage(hindiMessage);
    } else {
      setGeneratedMessage(hinglishMessage);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <MessageSquare className="w-8 h-8 text-indigo-600" />
          Parent Communication Helper
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी (Hindi)</option>
              <option value="hinglish">Hinglish</option>
            </select>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quick Note (in your own words)
          </label>
          <textarea
            value={quickNote}
            onChange={(e) => setQuickNote(e.target.value)}
            placeholder="e.g., Rahul was absent 5 days this month. He needs to focus more on math homework. He's good in sports."
            rows="5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleGenerateMessage}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Generate Professional Message
        </button>
      </div>

      {generatedMessage && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Message</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-sm mb-4 max-h-96 overflow-y-auto border border-gray-200">
            {generatedMessage}
          </div>
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <Copy className="w-4 h-4" />
            Copy to Clipboard (Ready for WhatsApp)
          </button>
        </div>
      )}
    </div>
  );
}
