using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// To parse text and convert it to IStatement
    /// </summary>
    internal class MainParser : AbstractParser
    {
        #region Parts
        /// <summary>
        /// Converts name to concept and concept to names
        /// </summary>
        private ConceptNameManager conceptNameManager;
        #endregion

        #region Constructors
        /// <summary>
        /// Create a parser to parse text and convert it to IStatement
        /// </summary>
        public MainParser()
        {
            conceptNameManager = new ConceptNameManager();
        }
        #endregion

        #region Public Methods
        /// <summary>
        /// parse text and convert it to IStatement
        /// </summary>
        /// <param name="text">text</param>
        /// <returns>IStatement</returns>
        public override IStatement Parse(string text)
        {
            text = text.ToLowerInvariant();
            text = text.Trim();

            if (text.StartsWith("if ") || text.StartsWith("!if") || text.StartsWith("not if"))
                return conditionParser.Parse(text);
            else if (text.Contains("&&") || text.Contains("||") || text.Contains(" and ") || text.Contains(" or "))
                return statementTreeParser.Parse(text);
        }
        #endregion
    }
}
