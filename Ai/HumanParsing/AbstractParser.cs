using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ArtificialArt.Ai
{
    /// <summary>
    /// To parse text and convert it to IStatement
    /// </summary>
    internal abstract class AbstractParser
    {
        /// <summary>
        /// parse text and convert it to IStatement
        /// </summary>
        /// <param name="text">text</param>
        /// <returns>IStatement</returns>
        public abstract IStatement Parse(string text);
    }
}
