using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai.HumanParsing
{
    /// <summary>
    /// To parse text and convert it to IStatement
    /// </summary>
    internal class MainParser : AbstractParser
    {
        #region Parts
        /// <summary>
        /// Converts text to statement tres
        /// </summary>
        private StatementTreeParser statementTreeParser;

        /// <summary>
        /// Converts text to "if" conditions
        /// </summary>
        private ConditionParser conditionParser;
        #endregion

        #region Constructors
        /// <summary>
        /// Create a parser to parse text and convert it to IStatement
        /// </summary>
        /// <param name="conceptNameMapper">concept name mapper</param>
        public MainParser(ConceptNameManager conceptNameMapper)
        {
            statementTreeParser = new StatementTreeParser(conceptNameMapper);
            conditionParser = new ConditionParser(statementTreeParser);
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
            else
                return statementTreeParser.Parse(text);
        }
        #endregion
    }
}
